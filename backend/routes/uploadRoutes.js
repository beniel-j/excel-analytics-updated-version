router.post('/upload', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const workbook = xlsx.read(req.file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const jsonData = xlsx.utils.sheet_to_json(sheet);

    const chart = new Chart({
      userId: req.user.id, // ✅ Important!
      title: sheetName || 'Uploaded Chart',
      data: jsonData,
      chartType: 'bar', // or based on frontend
      isSaved: false,
      timestamp: new Date()
    });

    await chart.save();

    res.status(201).json({ msg: 'Uploaded successfully' });
  } catch (error) {
    res.status(500).json({ msg: 'Upload failed' });
  }
});
