# Resume360 Global Profiler

![](https://img.shields.io/static/v1?label=Version&message=0.1.0&color=success)

![](https://img.shields.io/badge/NodeJS-20.11.0-336633)
![](https://img.shields.io/static/v1?label=VueJS&message=^3.4.21&color=success)
![](https://img.shields.io/badge/ExpressJS-^4.18.2-222222)
![](https://img.shields.io/badge/PostgreSQL-15.6-336791)


Welcome to **Resume360 Global profile**, a revolutionary project at the intersection of AI and Blockchain technologies. This project aims to leverage the power of decentralized ledger technology to securely register, store, and search resumes as unique non-fungible tokens (NFTs) on the blockchain.

## Project Overview

Resume360 Global Profiler leverages blockchain technology to create a secure and immutable repository for resumes. Each resume is transformed into a unique NFT, with AI algorithms employed to summarize and extract key attributes. The NFTs store these attributes within their smart contracts, facilitating efficient and accurate resume searches.

## Key Features

* NFT Representation: Resumes are tokenized into NFTs upon registration, enabling unique ownership and verification of resume authenticity.
* AI-Powered Attribute Extraction: AI algorithms analyze resumes to extract essential keywords and attributes, enhancing searchability and relevance.
* Smart Contract Verification: Smart contracts validate the legitimacy of resumes before minting them as NFTs on the blockchain.
* Blockchain Integrity: The blockchain ensures tamper-proof storage and traceability of resumes and their associated metadata.

## How It Works

1. Resume Registration: Users submit resumes through the platform, which undergo AI-based validation for authenticity and completeness.
1. AI Attribute Extraction: Resumes are processed by AI algorithms to extract keywords and essential attributes, summarizing their content.
1. Smart Contract Deployment: Upon validation, a smart contract is created for each resume-NFT pair, embedding extracted attributes and metadata.
1. NFT Minting: Valid resumes are minted into unique NFTs on the blockchain, associating them with their respective smart contracts.
1. Search and Access: Users can search and access resumes using the platform's frontend, querying keywords stored within NFTs' smart contracts.

## Contributor

* Jason Liu: ([https://github.com/ZhenqiLiu-Jason](https://github.com/ZhenqiLiu-Jason))
* Zhenyu Lin: ([https://github.com/zlin01](https://github.com/zlin01))
* Junxian Zhao: ([https://github.com/lotusknight](https://github.com/lotusknight))

## Getting Started

* Installation
  1. [Front End](docs/Installation-Frontend.md)
  1. [Back End](docs/Installation-Backend.md)
  1. [Database](docs/Installation-Database.md)

## File Structure

| Directory | Comment |
|-- |-- |
| /contracts | Solidity smart contracts |
| /database | PostgreSQL database schema |
| /docs | Documentation |
| /src | Code base. Most front-end script with VueJS v3 framework |
| /src/server | Backend script |