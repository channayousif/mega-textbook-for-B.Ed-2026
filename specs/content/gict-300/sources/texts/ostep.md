# Bound excerpt - ostep

Arpaci-Dusseau, R. H., & Arpaci-Dusseau, A. C. (2023). *Operating Systems: Three Easy Pieces*
(version 1.10). Free online book. https://pages.cs.wisc.edu/~remzi/OSTEP/

Open access (the book "is and will always be free" in PDF form, per its own site).
OpenAlex-verified 2026-09-23 (OpenAlex W2412976325). The chapter 4 PDF (cpu-intro.pdf,
"The Abstraction: The Process") was retrieved and read directly from the book's site on
2026-09-23; excerpts below are quoted for non-commercial educational use with chapter
citations.

## Chapter 4 - The Abstraction: The Process (verified)

The chapter frames the OS's core trick: "The OS creates this illusion by virtualizing the
CPU. By running one process, then stopping it and running another, and so forth, the OS can
promote the illusion that many virtual CPUs exist when in fact there is only one physical CPU
(or a few). This basic technique, known as time sharing of the CPU, allows users to run as
many concurrent processes as they would like; the potential cost is performance, as each will
run more slowly if the CPU(s) must be shared."

On what a process is: "what comprises a process is its memory. Instructions lie in memory;
the data that the running program reads and writes sits in memory as well. Thus the memory
that the process can address (called its address space) is part of the process. Also part of
the process's machine state are registers", including "the program counter (PC) (sometimes
called the instruction pointer or IP) [which] tells us which instruction of the program will
execute next", and "programs often access persistent storage devices too. Such I/O
information might include a list of the files the process currently has open."

On mechanisms and policies: "we call the low-level machinery mechanisms; mechanisms are
low-level methods or protocols that implement a needed piece of functionality", while
"Policies are algorithms for making some kind of decision within the OS. For example, given a
number of possible programs to run on a CPU, which program should the OS run?"

On process states: "In a simplified view, a process can be in one of three states: Running:
In the running state, a process is running on a processor. This means it is executing
instructions. Ready: In the ready state, a process is ready to run but for some reason the OS
has chosen not to run it at this given moment. Blocked: In the blocked state, a process has
performed some kind of operation that makes it not ready to run until some other event takes
place. A common example: when a process initiates an I/O request to a disk, it becomes
blocked and thus some other process can use the processor." On transitions: "A process can be
moved between the ready and running states at the discretion of the OS. Being moved from
ready to running means the process has been scheduled; being moved from running to ready
means the process has been descheduled."

Used for: the OS's resource management and time sharing (U3-01); the process abstraction,
its states and transitions (U3-03, U3-04); the scheduling-policy framing of the kernel's
work (U3-06).
