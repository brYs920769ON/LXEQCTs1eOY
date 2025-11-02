// 代码生成时间: 2025-11-02 12:55:03
 * Feature:
 * - Calculates the mean and median of a list of numbers.
 * - Handles errors related to invalid data inputs.
 */

import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// Define a type for data points
type DataPoints = number[];

class StatisticalAnalyzer {
    // Method to calculate the mean of a list of numbers
    public calculateMean(data: DataPoints): number | null {
        // Check if the data array is empty
        if (data.length === 0) {
            console.error("Error: The data array is empty.");
            return null;
        }

        const sum = data.reduce((a, b) => a + b, 0);
        return sum / data.length;
    }

    // Method to calculate the median of a list of numbers
    public calculateMedian(data: DataPoints): number | null {
        // Check if the data array is empty
        if (data.length === 0) {
            console.error("Error: The data array is empty.");
            return null;
        }

        const sortedData = [...data].sort((a, b) => a - b);
        const middleIndex = Math.floor(sortedData.length / 2);

        // If the data array has an odd number of elements, return the middle one
        if (sortedData.length % 2 === 1) {
            return sortedData[middleIndex];
        } else {
            // If the data array has an even number of elements, return the average of the two middle ones
            return (sortedData[middleIndex - 1] + sortedData[middleIndex]) / 2;
        }
    }
}

// Main function to run the program and demonstrate its functionality
async function main(): Promise<void> {
    try {
        const analyzer = new StatisticalAnalyzer();
        const data: DataPoints = [10, 20, 30, 40, 50];
        const mean = analyzer.calculateMean(data);
        const median = analyzer.calculateMedian(data());

        console.log("Mean: ", mean);
        console.log("Median: ", median);

        // Test the functionality of the StatisticalAnalyzer
        assertEquals(mean, 30);
        assertEquals(median, 30);
    } catch (error) {
        console.error("An unexpected error occurred: ", error);
    }
}

// Run the main function
main();