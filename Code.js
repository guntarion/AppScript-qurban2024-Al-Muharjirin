function onEditTrigger(e) {
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  var sheetName = sheet.getName();

  if (sheetName == "Dist_Pengqurban") {
    handleDistPengqurbanEdit(sheet, range);
  } else if (sheetName == "Dist_Kelompok") {
    handleDistKelompokEdit(sheet, range);
  }
}

function handleDistPengqurbanEdit(sheet, range) {
  Logger.log("Handling Dist_Pengqurban edit");
  var row = range.getRow();
  var column = range.getColumn();

  if (row < 10 || row > 300) return;

  var valueAA = sheet.getRange(row, 27).getValue(); // Column AA
  var valueAB = sheet.getRange(row, 28).getValue(); // Column AB
  var valueAC = sheet.getRange(row, 29).getValue(); // Column AC
  var number = sheet.getRange(row, 5).getValue(); // Column E

  if (column == 12 && range.getValue() === true) {
    // Column L
    var notifikasiSembelihan =
      "🔰*Qurban telah disembelih 🟧*\n\nAlhamdulillah, " +
      valueAB +
      ".\nHewannya telah disembelih✨\n\nSemoga qurbannya diterima sbg amal sholeh yg membawa kebarokahan bagi njenengan sekeluarga. Aamiin🤲🏼\n\nInsyaAllah, paket qurban akan kami kirimkan ke alamat sesuai input di " +
      valueAC +
      ".\n\nJika di siang hari ini tidak ada yang bisa menerima di alamat tersebut, harap segera memberi info ke kami.\nMatur Nuwun🙏🏼\n\n▸ a.n. Panitia Qurban Al Muhajirin Rewwin";
    sendNotificationAndLogTime(sheet, row, number, notifikasiSembelihan, 13); // Write datetime to column M
  }

  if (column == 16 && range.getValue() === true) {
    // Column P
    var notifikasiSiapKirim =
      "🔰*Qurban akan Dikirimkan*🟨\n\n" +
      valueAA +
      ".\n\nBagian Pengiriman dari panitia akan berangkat mengirimkan Paket Qurban njenengan di alamat _" +
      valueAC +
      "_.\n\n▸ a.n. Panitia Qurban Al Muhajirin Rewwin";
    sendNotificationAndLogTime(sheet, row, number, notifikasiSiapKirim, 17); // Write datetime to column Q
  }

  if (column == 18 && range.getValue() === true) {
    // Column R
    var notifikasiTuntas =
      "🔰*Qurban telah Terkirim 🟦*\n\n" +
      valueAB +
      ".\n\nPermisi dengan ini kami infokan bahwa Paket Qurban 3kg *telah terkirim* ke alamat njenengan. Jika ternyata paket tidak/belum diterima, harap menghubungi kami.\n\n▸a.n. Panitia Qurban Al Muhajirin Rewwin";
    sendNotificationAndLogTime(sheet, row, number, notifikasiTuntas, 19); // Write datetime to column S
  }
}

function handleDistKelompokEdit(sheet, range) {
  Logger.log("Handling Dist_Kelompok edit");
  var row = range.getRow();
  var column = range.getColumn();

  if (row < 3 || row > 300) return;

  var valueD = sheet.getRange(row, 4).getValue(); // Column D
  var valueH = sheet.getRange(row, 8).getValue(); // Column H
  var valueJ = sheet.getRange(row, 10).getValue() || 0; // Column J
  var valueK = sheet.getRange(row, 11).getValue() || 0; // Column K
  var valueP = sheet.getRange(row, 16).getValue(); // Column P
  var valueC = sheet.getRange(row, 3).getValue(); // Column C
  var number = sheet.getRange(row, 5).getValue(); // Column E

  if (column == 13 && range.getValue() === true) {
    // Column M
    var konfirmasiPengajuanElemen =
      "🔰*Paket Qurban Al Muhajirin*\n➡️ Mohon Konfirmasi Data \n\nWasholatu wassalamu 'ala Rasulillah, wa 'ala alihi wa shohbihi wa man waalah\n\nYth " +
      valueD +
      ".\nPada Idul Qurban 2024, insyaAllah *" +
      valueC +
      "* akan mendapat bagian distribusi dari Masjid Al Muhajirin Rewwin.\n\nUntuk itu, mohon dikonfirmasi terkait *jumlah pengajuan*. Ini terlepas, mohon maaf dan harap maklum 🙏🏼, jumlah riil yang dapat disalurkan sangat mengikuti ketersediaan daging setelah sembelihan.\n\nMohon juga diinfokan, *siapa nama orang (PIC)* yang akan melakukan pengambilan\n\nMelalui nomer ini, besok akan kami infokan ketika paket Qurban sudah siap untuk diambil.\n\nDemikian, info 1) jumlah pengajuan 2) nama PIC harap diinfokan dg membalas pesan WA ini.\n\nMatur Nuwun\n▸ a.n. Panitia Qurban Al Muhajirin Rewwin";
    sendWAMessage(number, konfirmasiPengajuanElemen);
  }

  if (column == 14 && range.getValue() === true) {
    // Column N
    var notifikasiSiapAmbilElemen =
      "🔰*Paket Qurban siap Diambil*🟨\n\nYth " +
      valueD +
      ".\n\nDengan ini kami infokan bahwa paket Qurban dari Masjid Al Muhajirin Rewwin untuk *" +
      valueC +
      "* telah siap untuk diambil.\n\nKami nantikan kehadiran dari PIC yang telah ditunjuk. Terima kasih.\n\n▸ a.n. Panitia Qurban Al Muhajirin Rewwin";
    sendNotificationAndLogTime(
      sheet,
      row,
      number,
      notifikasiSiapAmbilElemen,
      15
    ); // Write datetime to column O
  }

  if (column == 17 && range.getValue() === true) {
    // Column Q
    var currentDatetimeFormatted = Utilities.formatDate(
      new Date(),
      "GMT+7",
      "dd MMMM HH:mm"
    );
    var notifikasiSudahDiambilElemen =
      "🔰*Paket Qurban telah Diambil 🟦*\n\nYth " +
      valueD +
      ".\n\nDengan ini kami infokan bahwa paket Qurban dari Masjid Al Muhajirin Rewwin untuk " +
      valueC +
      ", dengan *jumlah total = " +
      valueH +
      " pack* yg terdiri dari:\n- Daging Sapi = " +
      valueJ +
      "\n- Daging Kambing = " +
      valueK +
      "\n\n*telah diambil oleh sdr. " +
      valueP +
      " pada " +
      currentDatetimeFormatted +
      " WIB*.\n\nMatur nuwun atas partisipasinya, dari kami mohon maaf atas pelayanan yang barangkali kurang memuaskan.\n\nSemoga semua di " +
      valueC +
      " mendapat kebarokahan yang berlimpah dari Allah. Aaamiin 🤲🏼\n\n ▸a.n. Panitia Qurban Al Muhajirin Rewwin";
    sendNotificationAndLogTime(
      sheet,
      row,
      number,
      notifikasiSudahDiambilElemen,
      18
    ); // Write datetime to column R
  }
}

function sendNotificationAndLogTime(
  sheet,
  row,
  number,
  message,
  datetimeColumn
) {
  sendWAMessage(number, message);
  var currentDatetime = new Date();
  sheet.getRange(row, datetimeColumn).setValue(currentDatetime);
}

function sendWAMessage(number, message) {
  var url = "http://68.183.186.142:3050/api/send-message";

  var payload = {
    number: number,
    message: message,
  };

  var options = {
    method: "POST",
    contentType: "application/json",
    payload: JSON.stringify(payload),
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    Logger.log("Message sent to " + number + ": " + message + "\n");
    // Logger.log(response.getContentText());
  } catch (e) {
    Logger.log("Error: " + e.toString());
  }
}

function obtainInventory() {
  var sheet =
    SpreadsheetApp.getActiveSpreadsheet().getSheetByName("MasterData");
  var url = "http://68.183.186.142:5050/api/inventory";

  // Make a GET request to the API
  var response = UrlFetchApp.fetch(url, { method: "get" });
  var data = JSON.parse(response.getContentText());

  // Clear the existing data in the sheet (if necessary)
  sheet.getRange("B3:D6").clearContent();

  // Set the new data in the sheet
  for (var i = 0; i < data.length; i++) {
    var row = i + 3; // Assuming data starts at row 3
    sheet.getRange(row, 2).setValue(data[i].name);
    sheet.getRange(row, 3).setValue(data[i].hasil);
    sheet.getRange(row, 4).setValue(data[i].target_value);
  }
}
