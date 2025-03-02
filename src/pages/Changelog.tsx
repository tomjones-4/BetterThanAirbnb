import React, { useState, useEffect } from "react";
import * as fs from "fs";
const { readFileSync } = fs;

const ChangelogPage = () => {
  const [changelog, setChangelog] = useState("");

  useEffect(() => {
    try {
      const content = readFileSync("changelog.md", "utf-8");
      setChangelog(content);
    } catch (error) {
      console.error("Error reading changelog:", error);
      setChangelog("Error loading changelog. Please try again.");
    }
  }, []);

  return (
    <div>
      <h1>Changelog</h1>
      <pre>{changelog}</pre>
    </div>
  );
};

export default ChangelogPage;
