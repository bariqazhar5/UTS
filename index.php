<?php
include 'db.php';  // Koneksi ke database

// Query produk dari database
$sql = "SELECT id, name, price, image_url FROM products";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    echo "<h1>Daftar Produk</h1>";
    echo "<ul>";

    while($row = $result->fetch_assoc()) {
        echo "<li>";
        echo "<img src='{$row['image_url']}' alt='{$row['name']}' width='200' /><br>";
        echo "<strong>{$row['name']}</strong><br>";
        echo "Harga: Rp " . number_format($row['price'], 0, ',', '.') . "<br>";
        echo "</li><hr>";
    }

    echo "</ul>";
} else {
    echo "Tidak ada produk.";
}

$conn->close();
?>
