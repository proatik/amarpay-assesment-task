import fs from "fs";
import path from "path";

// types.
import { Event } from "@/types/event";

// type definitions.
type Data = { events: Event[] };

const dataFilePath = path.join(process.cwd(), "src", "db", "data.json");

export function readData(): Data {
  try {
    const jsonData = fs.readFileSync(dataFilePath, "utf8");
    return JSON.parse(jsonData);
  } catch (error) {
    console.error("Error reading data:", error);
    return { events: [] };
  }
}

export function writeData(data: Data): boolean {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error("Error writing data:", error);
    return false;
  }
}

export function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
