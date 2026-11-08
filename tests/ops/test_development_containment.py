"""Lightweight tests: python3 -m unittest discover -s tests/ops -v"""
import importlib.util
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

ROOT = Path(__file__).resolve().parents[2]
spec = importlib.util.spec_from_file_location('admission', ROOT / 'scripts/development/wait-for-headroom.py')
admission = importlib.util.module_from_spec(spec)
spec.loader.exec_module(admission)


class AdmissionTests(unittest.TestCase):
    def test_thresholds(self):
        with tempfile.TemporaryDirectory() as directory:
            proc = Path(directory)
            (proc / 'pressure').mkdir()
            (proc / 'meminfo').write_text('MemAvailable: 3145728 kB\n')
            for kind in ('memory', 'io'):
                (proc / 'pressure' / kind).write_text('some avg10=10.00 avg60=0.00 total=0\n')
            self.assertTrue(admission.healthy(proc))
            (proc / 'pressure/io').write_text('some avg10=10.01 avg60=0 total=0\n')
            self.assertFalse(admission.healthy(proc))
            (proc / 'pressure/io').write_text('some avg10=0 avg60=0 total=0\n')
            (proc / 'meminfo').write_text('MemAvailable: 3145727 kB\n')
            self.assertFalse(admission.healthy(proc))

    def test_healthy_window_resets(self):
        clock = [0]
        def sleep(seconds):
            clock[0] += seconds
        def healthy():
            return clock[0] != 15
        with patch.object(admission.time, 'monotonic', side_effect=lambda: clock[0]), \
             patch.object(admission.time, 'sleep', side_effect=sleep), \
             patch.object(admission, 'healthy', side_effect=healthy):
            self.assertEqual(admission.wait(timeout=100), 0)
            self.assertEqual(clock[0], 50)

    def test_missing_pressure_times_out(self):
        clock = [0]
        def sleep(seconds):
            clock[0] += seconds
        with patch.object(admission.time, 'monotonic', side_effect=lambda: clock[0]), \
             patch.object(admission.time, 'sleep', side_effect=sleep), \
             patch.object(admission, 'healthy', side_effect=OSError):
            self.assertEqual(admission.wait(timeout=10), 75)


if __name__ == '__main__':
    unittest.main()
