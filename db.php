<?php
$servername = "diecastcorner-db.cnywe84w2h7u.ap-southeast-1.rds.amazonaws.com";  // Ganti dengan endpoint RDS kamu
$username = "admin";    // Ganti dengan username database kamu
$password = "pesawatjet12";    // Ganti dengan password database kamu
$dbname = "diecastcorner-db";        // Nama database yang digunakan

// Membuat koneksi
$conn = new mysqli($servername, $username, $password, $dbname);

// Memeriksa koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}
?>
