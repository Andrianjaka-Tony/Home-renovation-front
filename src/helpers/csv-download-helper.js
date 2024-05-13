function downloadCsv(content = "", filename = "file.csv") {
  try {
    const decodedContent = atob(content);

    const blob = new Blob([decodedContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();

    URL.revokeObjectURL(url);
    document.body.removeChild(link);
  } catch (error) {
    console.log("Error downloading CSV", error);
  }
}

export default downloadCsv;
