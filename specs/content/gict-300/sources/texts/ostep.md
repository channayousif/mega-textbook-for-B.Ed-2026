# Bound excerpt - ostep

Arpaci-Dusseau, R. H., & Arpaci-Dusseau, A. C. (2023). *Operating Systems: Three Easy Pieces*
(version 1.10). Free online book. https://pages.cs.wisc.edu/~remzi/OSTEP/

Open access (the book "is and will always be free" in PDF form, per its own site).
OpenAlex-verified 2026-09-23 (OpenAlex W2412976325). The chapter PDFs (cpu-intro.pdf
chapter 4 "The Abstraction: The Process"; file-intro.pdf chapter 39 "Interlude: Files and
Directories"; file-devices.pdf chapter 36 "I/O Devices") were retrieved and read directly
from the book's site on 2026-09-23; excerpts below are quoted for non-commercial
educational use with chapter citations.

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

## Chapter 39 - Interlude: Files and Directories (verified)

The chapter presents two abstractions: "A file is simply a linear array of bytes,
each of which you can read or write. Each file has some kind of low-level name, usually a
number of some kind... For historical reasons, the low-level name of a file is often
referred to as its inode number (i-number)." On the OS's relationship to file contents:
"In most systems, the OS does not know much about the structure of the file (e.g., whether
it is a picture, or a text file, or C code); rather, the responsibility of the file system
is simply to store such data persistently on disk and make sure that when you request the
data again, you get what you put there in the first place."

On directories: "A directory, like a file, also has a low-level name (i.e., an inode
number), but its contents are quite specific: it contains a list of (user-readable name,
low-level name) pairs... Each entry in a directory refers to either files or other
directories. By placing directories within other directories, users are able to build an
arbitrary directory tree (or directory hierarchy), under which all files and directories
are stored. The directory hierarchy starts at a root directory (in UNIX-based systems, the
root directory is simply referred to as /)". Files are then named by their absolute
pathname (e.g., /foo/bar.txt), and a file's name commonly has two parts, "the first part
is an arbitrary name, whereas the second part of the file name is usually used to indicate
the type of the file... However, this is usually just a convention."

On metadata (section 39.9): "Beyond file access, we expect the file system to keep a fair
amount of information about each file it is storing. We generally call such data about
files metadata. To see the metadata for a certain file, we can use the stat() or fstat()
system calls... there is a lot of information kept about each file, including its size (in
bytes), its low-level name (i.e., inode number), some ownership information, and some
information about when the file was accessed or modified, among other things."

Used for: file management - the file abstraction, naming, directory trees, paths and
metadata (U3-03).

## Chapter 36 - I/O Devices (verified)

The chapter describes a canonical device as having "two important components. The first is
the hardware interface it presents to the rest of the system... all devices have some
specified interface and protocol for typical interaction. The second part of any device is
its internal structure."

On the OS's mediation of devices: "At the lowest level, a piece of software in the OS must
know in detail how a device works. We call this piece of software a device driver, and any
specifics of device interaction are encapsulated within." The chapter illustrates with the
Linux file-system stack: "a file system (and certainly, an application above) is completely
oblivious to the specifics of which disk class it is using; it simply issues block read and
write requests to the generic block layer, which routes them to the appropriate device
driver, which handles the details of issuing the specific request." The chapter also notes
that "because device drivers are needed for any device you might plug into your system,
over time they have come to represent a huge percentage of kernel code."

Used for: input/output management - the device interface, the device driver's translation
role, and the layered mediation between applications and devices (U3-05).
