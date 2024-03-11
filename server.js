
const app = require("./src/app")
const port = process.env.PORT
const server = app.listen(port, () => {
    console.log(`hello port ${port}`);
})

// Thêm một người nghe cho tín hiệu SIGINT
process.on('SIGINT', () => {
    // Đầu tiên, loại bỏ người nghe của SIGINT để tránh thêm người nghe không cần thiết
    process.removeAllListeners('SIGINT');

    // Sau đó, xử lý tín hiệu SIGINT
    server.close(() => {
        console.log("exit server");
        process.exit(0);
    });
});
