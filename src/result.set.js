module.exports = {
    models: {
        a: {
            text: 'รูปแบบ A'
        },
        b: {
            text: 'รูปแบบที่ B'
        },

        precedure: async function({ price, volume } = { price: Number(0), volume: 0 }) {
            console.log(price, volume)
        },

        // array type
        precedures: function(res = Array()) {
            // ขอ ราคาแท่ง ปัจจุบัน เป็นสีเขียว
            if (res[0].price > 30) {
                // ขอ volume แท่งปัจจุบัน มากกว่า แท่งเก่า 2 เท่า
                if (res[0].volume > (res[1].volume) * 2) {
                    console.log(res[0], res[1]);
                    return true;
                }
            }

            return false;
        }
    }
};