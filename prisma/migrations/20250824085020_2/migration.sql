-- CreateTable
CREATE TABLE `karyawans` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `jabatan` VARCHAR(255) NOT NULL,
    `umur` INTEGER NOT NULL,
    `gaji` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
