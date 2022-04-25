const { HttpError } = require("../../../middlewares/errors/http-error");
const { httpResponse } = require("../../../middlewares/http/http-response");
const { zodiacMeaning } = require("./zodiac_meaning");




const zodiacGenerator = async (req, res, next) => {
    try {
        const { date, month, year } = req.body;
        if (!date || !month || !year) {
            const e = new HttpError(400, "Date, month and year are compulsory parameters");
            return next(e);
        }
        let dateOfbirth;
        let yearOfBirth;
        let monthOfbirth;
        if (date.length == 2&&date!=11) {
            const db = date.split("");
            const arr = Number(db[0]) + Number(db[1]);
            const checkArr = arr.toString();
            if (checkArr.length == 2) {
                const db = checkArr.split("");
                const finalDigit = Number(db[0]) + Number(db[1])
                dateOfbirth = finalDigit;
            } else {
                dateOfbirth = arr;
            }

        }

        if (month.length == 2) {
            const db = month.split("");
            const arr = Number(db[0]) + Number(db[1])
            const checkArr = arr.toString();
            if (checkArr.length == 2) {
                const db = checkArr.split("");
                const finalDigit = Number(db[0]) + Number(db[1])

                monthOfbirth = finalDigit;
            } else {
                monthOfbirth = Number(arr);
            }

        } else {
            monthOfbirth = month;
        }

        const yB = year.split("");
        const yDigit = Number(yB[0]) + Number(yB[1]) + Number(yB[2]) + Number(yB[3]);
        const yDigitToString = yDigit.toString()
        if (yDigitToString.length == 2) {
            const yB = yDigitToString.split("");
            const yDigit = Number(yB[0]) + Number(yB[1]);
            yearOfBirth = yDigit;
        } else {
            yearOfBirth = yDigit;
        }
        const zodiacCalculation = Number(yearOfBirth) + Number(monthOfbirth) + Number(dateOfbirth);
        const zodiacCalculationToString = zodiacCalculation.toString();
        if (zodiacCalculationToString.length == 2) {
            const e = zodiacCalculation.toString().split("");
            const finalNumber = Number(e[0]) + Number(e[1]);
            const checkFinalNumber = finalNumber.toString().split("");
            if (checkFinalNumber.length == 2) {
                const splitDigit = finalNumber.toString().split("");
                const zodiacNumber = Number(splitDigit[0]) + Number(splitDigit[1]);
                zodiacMeaning.map(zodiac => {
                    if (zodiac.path_number == zodiacNumber) {
                        httpResponse({ status_code: 200, response_message: 'Available', data: { message: zodiac.msg }, res });
                    }
                });
            } else {
                zodiacMeaning.map(zodiac => {
                    if (zodiac.path_number == finalNumber) {
                        httpResponse({ status_code: 200, response_message: 'Available', data: { message: zodiac.msg }, res });
                    }
                });
            }


        } else {
            zodiacMeaning.map(zodiac => {
                if (zodiac.path_number == zodiacCalculation) {
                    httpResponse({ status_code: 200, response_message: 'Available', data: { message: zodiac.msg }, res });
                }
            });
        }

    } catch (error) {
        console.log(error);
        const e = new HttpError(500, "Unable to perform this operation at the moment");
        return next(e);
    }
}

module.exports = {
    zodiacGenerator
}