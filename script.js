// DOMContentLoaded イベントでスクリプトを実行
document.addEventListener("DOMContentLoaded", () => {
    const bodyId = document.body.id;

    if (bodyId === "amount-page") {
        initAmountCalculator();
    } else if (bodyId === "age-page") {
        initAgeCalculator();
    }
});

// 金額計算ページの初期化関数
function initAmountCalculator() {
    const amountInput = document.getElementById("amount");
    const totalDisplay = document.getElementById("total");
    const taxDisplay = document.getElementById("tax");
    const addButton = document.getElementById("addButton");
    const tax8Button = document.getElementById("tax8Button");
    const tax10Button = document.getElementById("tax10Button");

    let totalAmount = 0; // 合計金額を管理

    // 金額を追加する関数
    function addAmount() {
        const value = parseFloat(amountInput.value);
        if (isNaN(value) || value <= 0) {
            alert("正しい金額を入力してください。");
            return;
        }

        totalAmount += value;
        updateDisplays();
        amountInput.value = ""; // 入力欄をクリア
    }

    // 消費税を適用する関数
    function applyTax(rate) {
        totalAmount = totalAmount * (1 + rate / 100);
        updateDisplays();
    }

    // 合計金額と消費税額を更新する関数
    function updateDisplays() {
        totalDisplay.textContent = totalAmount.toFixed(2);
        taxDisplay.textContent = (totalAmount * 0.1).toFixed(2);
    }

    // ボタンにイベントリスナーを登録
    addButton.addEventListener("click", addAmount);
    tax8Button.addEventListener("click", () => applyTax(8));
    tax10Button.addEventListener("click", () => applyTax(10));
}

// 年齢計算ページの初期化関数
function initAgeCalculator() {
    const birthInput = document.getElementById("birthdate");
    const ageDisplay = document.getElementById("age");
    const zodiacDisplay = document.getElementById("zodiac");
    const horoscopeDisplay = document.getElementById("horoscope");
    const calculateButton = document.getElementById("calculateButton");

    // 年齢計算関数
    function calculateAge() {
        const birthDate = new Date(birthInput.value);
        if (isNaN(birthDate)) {
            alert("有効な生年月日を入力してください。");
            return;
        }

        const now = new Date();
        let age = now.getFullYear() - birthDate.getFullYear();
        const isBirthdayPassed = (now.getMonth() > birthDate.getMonth()) ||
                                 (now.getMonth() === birthDate.getMonth() && now.getDate() >= birthDate.getDate());

        if (!isBirthdayPassed) {
            age -= 1;
        }

        ageDisplay.textContent = age;
        zodiacDisplay.textContent = getZodiac(birthDate);
        horoscopeDisplay.textContent = getHoroscope(birthDate);
    }

    // 干支を取得する関数
    function getZodiac(date) {
        const zodiacs = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"];
        return zodiacs[date.getFullYear() % 12];
    }

    // 星座を取得する関数
    function getHoroscope(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();

        if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "牡羊座";
        if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "牡牛座";
        if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "双子座";
        if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "蟹座";
        if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "獅子座";
        if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "乙女座";
        if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "天秤座";
        if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "蠍座";
        if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "射手座";
        if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return "山羊座";
        if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "水瓶座";
        if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "魚座";

        return "不明";
    }

    // ボタンにイベントリスナーを登録
    calculateButton.addEventListener("click", calculateAge);
}
