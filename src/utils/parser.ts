import Papa from "papaparse";

export const parseToCSV = (data: string[][], filename = "data.csv") => {
  const csv = Papa.unparse(data);

  const blob = new Blob([csv], { type: "text/csv" });
  const link = document.createElement("a");
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else console.error("Your browser does not support the download attribute.");
};
