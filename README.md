# ITMD 442 Lab 2

## General Information

**Name:** Angela Petrone

**Email:** <apetrone@hawk.iit.edu>

**Class:** ITMD 442

**Assignment:** lab #2

**Git Repository URL:** <https://github.com/avgelix/ITMD442lab2>


### Project Description

This is a NodeJS Express app that stores information in a JSON file. This app can be used as a phonebook to record contact information for multiple people. This is a web app and can be used in a browser. This app allows to create, delete, and edit contact information as many times as the user wants.


### Development Environment

- computer OS: macOS
- Node JS version number: v20.3.1
- editors used: VSCode


### Installation Instructions

1. Clone this repository on your machine
2. Open a terminal or command prompt and navigate to the directory where you have cloned the repository.
3. Run "npm i" to install dependencies
4. Run "npm run dev" and open "localhost:3000/" in your browser


### Insights and Results

I learned a lot through this lab. I had never used pug before. I was exposed to Django in the past, so the MVC pattern we used for this project wasn't too different from the MTV pattern I remembered. Pug is very sensitive about spacing, which sometimes made me think something was wrong elsewhere in the code. The in-class demo was extremely helpful.


### References

I used ChatGPT to figure out how to validate email in such a way that it was not required but if the user did input something that input would be validated. I read the express-validator documentation on validation chains but could not figure it out on my own. These are the lines of code I am referring to, specifically:

File: contact.js

        .custom((value, { req }) => {
          if (!value || value.trim() === "") {
            // Skip email validation if value is empty
            return true;
          }

This tutorial really helped me understand how to get bootstrap to work with pug <https://www.youtube.com/watch?v=nDSpd6f8t_o>

I coded every component of this project individually, using the in-class tutorial as a reference.
