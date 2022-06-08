// TODO: import module bila dibutuhkan di sini
const fs = require("fs");

// ! JANGAN DIMODIFIKASI
let file1 = "./data1.json";
let file2 = "./data2.json";
let file3 = "./data3.json";

// ! JANGAN DIMODIFIKASI
let modifyFile1 = (val) => {
    file1 = val;
};
let modifyFile2 = (val) => {
    file2 = val;
};
let modifyFile3 = (val) => {
    file3 = val;
};

// TODO: Kerjakan bacaData
// gunakan variabel file1, file2, dan file3
const getKata = (data) => {
    const subtrData = data.split(" ");

    if (subtrData?.length >= 1) {
        return subtrData[1];
    }
};

const prosesData = (data) => {
    let msg = "";

    //process data
    data = JSON.parse(data);

    //chek json type not array
    if (data?.message != undefined) {
        msg = data?.message;
    }

    //chek json type array
    if (Array.isArray(data)) {
        data.forEach((item) => {
            if (item?.message !== undefined) {
                msg = item?.message;
            }

            if (item?.data?.message !== undefined) {
                msg = item?.data?.message;
            }
        });
    }

    return getKata(msg);
};

const bacaData = (fnCallback) => {
    const fileData = [file1, file2, file3];
    const result = [];

    fileData.forEach((item) => {
        const readFile = new Promise((resolve, reject) => {
            fs.readFile(item, "utf-8", (err, data) => {
                if (err) return reject(err);

                return resolve(prosesData(data));
            });
        });

        //push array hasil promise
        result.push(readFile);
    });

    //return all arraynya dan cek jika ada error return callback with error
    Promise.all(result)
        .then((values) => {
            fnCallback(null, values);
        })
        .catch((error) => {
            fnCallback(error, null);
        });
};

// ! JANGAN DIMODIFIKASI
module.exports = {
    modifyFile1,
    modifyFile2,
    modifyFile3,
    bacaData,
};
