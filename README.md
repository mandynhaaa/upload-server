# Image Upload Widget API

This repository contains the backend server for an image upload widget, developed as a practical project for my post-graduate studies at [Rocketseat](https://www.rocketseat.com.br/faculdade). The main objective of this module was to design an efficient, scalable, and resilient backend architecture, moving beyond basic APIs to focus on advanced data handling and memory optimization.

## Key Concepts & Learnings

* **Memory Efficiency with Node.js Streams:** Implemented streams to handle file processing and generate CSV exports. This ensures the application can process large datasets efficiently without overloading the server's RAM.
* **Database Optimization with PostgreSQL Cursors:** Utilized cursors to fetch massive amounts of database records in manageable, memory-safe chunks during the data export process.
* **Cloud Object Storage:** Integrated Cloudflare R2 (an S3-compatible service) to securely handle the uploading, serving, and listing of image files.
* **Continuous Integration (CI):** Configured CI workflows to automate checks, ensuring code quality and integration safety throughout the development cycle.
* **Reliability & Testing:** Built a robust environment focused on strict data validation, centralized error handling, and comprehensive automated testing to guarantee the stability of the application.

## Tech Stack

* **TypeScript** - Providing static typing, interfaces, and a safer developer experience.
* **Node.js** - Server runtime environment.
* **PostgreSQL** - Relational database for storing file metadata securely.
* **Cloudflare R2** - Cloud object storage for the uploaded images.
* **Automated Testing with Vitest** - Ensuring business rules and workflows function exactly as expected.
* **CI Workflows** - Automating the testing and validation pipelines.
