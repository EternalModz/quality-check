#!/usr/bin/env node
// @ts-check

const fs = require("fs");
const path = require("path");
const stringSimilarity = require("string-similarity");

const folder1 = "path/to/folder1"; // Replace with actual path
const folder2 = "path/to/folder2"; // Replace with actual path

// Get file names without extensions
const getSongName = (filename) => path.parse(filename).name;

const files1 = fs.readdirSync(folder1).map((file) => getSongName(file));
const files2 = fs.readdirSync(folder2);

files1.forEach((file1) => {
    const names2 = files2.map((file) => getSongName(file));
    const matches = stringSimilarity.findBestMatch(file1, names2);
    const bestMatchIndex = matches.bestMatchIndex;
    
    if (matches.bestMatch.rating > 0.5) { // Adjust threshold as needed
        const oldFilePath = path.join(folder2, files2[bestMatchIndex]);
        const ext = path.extname(files2[bestMatchIndex]);
        const newFilePath = path.join(folder2, `${file1}${ext}`);

        fs.renameSync(oldFilePath, newFilePath);
        console.log(`Renamed: ${files2[bestMatchIndex]} -> ${file1}${ext}`);
    } else {
        console.log(`No close match found for: ${file1}`);
    }
});
