-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: localhost    Database: usuario_esrosita
-- ------------------------------------------------------
-- Server version	8.0.30

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bebida_ingrediente`
--

DROP TABLE IF EXISTS `bebida_ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bebida_ingrediente` (
  `id` int NOT NULL AUTO_INCREMENT,
  `bebida_id` int NOT NULL,
  `ingrediente_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `bebida_id` (`bebida_id`),
  KEY `ingrediente_id` (`ingrediente_id`),
  CONSTRAINT `bebida_ingrediente_ibfk_1` FOREIGN KEY (`bebida_id`) REFERENCES `bebidas` (`id`) ON DELETE CASCADE,
  CONSTRAINT `bebida_ingrediente_ibfk_2` FOREIGN KEY (`ingrediente_id`) REFERENCES `ingredientes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bebida_ingrediente`
--

LOCK TABLES `bebida_ingrediente` WRITE;
/*!40000 ALTER TABLE `bebida_ingrediente` DISABLE KEYS */;
INSERT INTO `bebida_ingrediente` VALUES (22,20,8),(23,20,12),(24,20,37),(25,20,48),(26,20,49),(27,20,50),(28,20,19),(29,21,7),(30,21,12),(31,21,37),(32,21,47),(33,22,7),(34,22,41),(35,22,42),(36,22,43),(37,22,44),(38,22,45),(39,22,46),(40,22,47),(42,24,60),(43,24,37),(44,24,47),(46,25,10),(47,25,12),(48,25,17),(49,25,15),(50,26,52),(51,26,53),(52,26,54),(53,26,8),(54,27,37),(55,27,55),(56,27,56),(57,27,57),(58,27,48),(59,27,12),(60,28,10),(61,28,61),(62,28,62),(63,28,63),(64,28,64),(65,28,8),(66,29,8),(67,29,12),(68,29,66),(69,29,65),(70,30,14),(71,30,100),(72,30,101),(73,30,102);
/*!40000 ALTER TABLE `bebida_ingrediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bebidas`
--

DROP TABLE IF EXISTS `bebidas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bebidas` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `descripcion` text,
  `precio` decimal(10,2) DEFAULT NULL,
  `categoria` varchar(100) DEFAULT NULL,
  `ingredientes` text,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bebidas`
--

LOCK TABLES `bebidas` WRITE;
/*!40000 ALTER TABLE `bebidas` DISABLE KEYS */;
INSERT INTO `bebidas` VALUES (20,'Mojito','Con un buen equilibro entre ácido, dulce y aromático, perfecto para celebrar y refrescar.',40.00,'Cocteles','Lima, Hielo, Azucar, Ron blanco, Menta, Soda, Amargo de angostura','1752007972254-mojito.png'),(21,'Limonada Fronzen','Limonada fronzen',15.00,'Jugos Naturales','Limon, Hielo, Azucar, Agua','1752009210108-lemonade-6585073_1280.jpg'),(22,'Chicha Morada','Bebida peruana a base maiz morado,membrillo,canela y mas...',10.00,'Jugos Naturales','Limon, Maiz Morado, Membrillo, Manzana verde, Durazno, Clavos de olor, Canela, Agua','1752009910975-beb_chicha.webp'),(24,'Jugo de Guanabana','Jugo de Guanabana',10.00,'Jugos Naturales','Guanabana, Azucar, Agua','1752010455454-jugo de guanabana.png'),(25,'Tequila Sunrise','Esta clásica receta mexicana fue creada en la década de 1930, obtiene su nombre por la mezcla de granadina junto al jugo de naranja y el tequila, que le dan unos tonos muy parecidos a un amanecer en las playas de Acapulco.',60.00,'Cocteles','Naranja, Tequila, Hielo, Granadina, Cereza','1752011386696-istockphoto-537641816-612x612.jpg'),(26,'Cosmopolitan','Se prepara con vodka, triple sec, jugo de arándano y jugo de lima. Es una variación frutal del martini de vodka.',90.00,'Cocteles','Vodcka de sidra, Cointreau, Jugo de Arandanos, Lima','1752012420699-cosmopolita.png'),(27,'Piña colada','Piña colada',15.00,'Cocteles','Azucar, Jugo de piña, Crema de coco, Cerezas al marrasquino, Ron blanco, Hielo','1752013836195-pina colada.png'),(28,'Margarita','Combinando el toque ácido de la lima y el dulzor del licor de naranja con el distintivo perfil de sabor del tequila, la margarita clásica sigue siendo uno de los ejemplos más reconocibles y atemporales de la categoría de cócteles ácidos (aquellos que equilibran una bebida espirituosa con jugo cítrico ácido y un elemento edulcorante).',60.00,'Cocteles','Tequila, Licor de naranja, Jugo de limon, Jarabe de agave, Sal kosher, Lima','1752015091310-Margarita.png'),(29,'Caipiroska','Es una versión derivada del cóctel nacional de Brasil: la caipirinha',40.00,'Cocteles','Lima, Hielo, Vodcka, Jarabe de goma','1752023975328-caipiroska.png'),(30,'Dry Martini','La maestría de lo simple. Nuestro Dry Martini se elabora con una precisión excepcional, donde la ginebra de calidad superior se encuentra con el vermut seco en un equilibrio delicado. Frío, nítido y poderosamente refrescante, es una experiencia que perdura.',40.00,'Tragos','Ginebra, Vermut Seco, Amargo de Naranja, Rodaja de Limon','1753145275336-Martini.png');
/*!40000 ALTER TABLE `bebidas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredientes`
--

DROP TABLE IF EXISTS `ingredientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ingredientes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `calorias` int NOT NULL,
  `es_vegano` varchar(2) NOT NULL,
  `contiene_gluten` varchar(2) NOT NULL,
  `es_citrico` varchar(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=106 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredientes`
--

LOCK TABLES `ingredientes` WRITE;
/*!40000 ALTER TABLE `ingredientes` DISABLE KEYS */;
INSERT INTO `ingredientes` VALUES (5,'Fresa',33,'Si','No','No'),(6,'Pina',50,'Si','No','No'),(7,'Limon',29,'Si','No','Si'),(8,'Lima',30,'Si','No','Si'),(9,'Granada',83,'Si','No','No'),(10,'Tequila',100,'No','No','No'),(11,'Guinda',78,'Si','No','No'),(12,'Hielo',0,'Si','No','No'),(13,'Ron',231,'No','No','No'),(14,'Ginebra',231,'No','No','No'),(15,'Cereza',58,'Si','No','No'),(16,'Triple seco',148,'No','No','No'),(17,'Granadina',268,'No','No','No'),(18,'Bénédictine DOM',134,'No','No','No'),(19,'Amargo de angostura',134,'No','No','No'),(20,'Carne de Res',250,'No','No','No'),(21,'Ajo',4,'Si','No','No'),(22,'Sal',0,'Si','No','No'),(24,'Arroz',130,'Si','No','No'),(25,'Papas Fritas',312,'No','No','No'),(26,'Aceite Vegetal',884,'No','No','No'),(27,'Cebolla Morada',40,'Si','No','No'),(28,'Tomate',22,'Si','No','No'),(29,'Aji Amarillo',39,'Si','No','No'),(30,'Salsa de soya',53,'Si','Si','No'),(31,'Vino Tinto',3,'Si','No','No'),(32,'Caldo de Res',100,'Si','No','No'),(33,'Cilantro',7,'Si','No','No'),(34,'Maiz',90,'No','No','No'),(35,'Leche',42,'No','No','No'),(36,'Maicena',381,'Si','No','No'),(37,'Azucar',387,'No','No','No'),(38,'Mantequilla',717,'No','No','No'),(39,'Huevo',155,'Si','No','No'),(40,'Queso Blanco',300,'No','No','No'),(41,'Maiz Morado',357,'Si','No','No'),(42,'Membrillo',57,'Si','No','No'),(43,'Manzana verde',52,'Si','No','No'),(44,'Durazno',39,'Si','No','No'),(45,'Clavos de olor',274,'Si','No','No'),(46,'Canela',247,'Si','No','No'),(47,'Agua',0,'Si','No','No'),(48,'Ron blanco',100,'No','No','No'),(49,'Menta',2,'Si','No','No'),(50,'Soda',150,'Si','No','No'),(51,'Champagne',125,'No','No','No'),(52,'Vodcka de sidra',97,'No','No','No'),(53,'Cointreau',359,'No','No','No'),(54,'Jugo de Arandanos',115,'Si','No','No'),(55,'Jugo de piña',133,'Si','No','No'),(56,'Crema de coco',890,'Si','No','No'),(57,'Cerezas al marrasquino',8,'Si','No','No'),(58,'Yogurt helado sin grasa',140,'Si','No','No'),(59,'Cacao en polvo',20,'No','No','No'),(60,'Guanabana',66,'Si','No','No'),(61,'Licor de naranja',146,'No','No','No'),(62,'Jugo de limon',22,'Si','No','Si'),(63,'Jarabe de agave',310,'No','No','No'),(64,'Sal kosher',0,'Si','No','No'),(65,'Jarabe de goma',43,'No','No','No'),(66,'Vodcka',97,'No','No','No'),(67,'Caraotas',100,'Si','No','No'),(68,'Platano frito',300,'No','No','No'),(69,'Carne Mechada',196,'No','No','No'),(70,'Camarones',99,'No','No','No'),(71,'Anillos de calamar',92,'No','No','No'),(72,'Queso Parmesano',431,'No','No','No'),(73,'Camote',86,'Si','No','No'),(74,'Maiz(choclo) cocido',96,'Si','No','No'),(75,'Leche de Tigre',96,'No','No','Si'),(76,'Pescado de corvina',148,'Si','No','No'),(77,'Aji',7,'Si','No','No'),(78,'Tequeños Venezolanos',300,'No','No','No'),(79,'Guasacaca',212,'No','No','No'),(80,'Salsa de Ajo',80,'No','No','No'),(81,'Salsa de tocineta',400,'No','No','No'),(82,'Guasacaca',212,'No','No','No'),(83,'Aceitunas',2,'Si','No','No'),(84,'Palta',320,'Si','No','No'),(85,'Mayonesa',680,'No','No','No'),(86,'Atun',140,'Si','No','No'),(87,'Papa',87,'Si','No','No'),(88,'Chicha de Jora',70,'No','No','No'),(89,'Cerveza Negra',70,'No','No','No'),(90,'Pato',300,'Si','No','No'),(91,'Alverjas',160,'Si','No','No'),(92,'Zanahoria',35,'Si','No','No'),(93,'Pimientos',30,'Si','No','No'),(94,'Auyama',34,'Si','No','No'),(95,'Ocumo',134,'Si','No','No'),(96,'Platano Verde',100,'Si','No','No'),(97,'Yuca',191,'Si','No','No'),(98,'Costillas de res',400,'No','No','No'),(99,'Pieza de Gallina',196,'No','No','No'),(100,'Vermut Seco',45,'No','No','No'),(101,'Amargo de Naranja',10,'No','No','No'),(102,'Rodaja de Limon',2,'Si','No','Si'),(103,'Ron Blanco',97,'No','No','No'),(104,'Zumo de Lima Fresco',25,'Si','No','Si'),(105,'Hierbabuena',44,'Si','No','No');
/*!40000 ALTER TABLE `ingredientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plato_ingrediente`
--

DROP TABLE IF EXISTS `plato_ingrediente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `plato_ingrediente` (
  `id_plato` int NOT NULL,
  `id_ingrediente` int NOT NULL,
  PRIMARY KEY (`id_plato`,`id_ingrediente`),
  KEY `id_ingrediente` (`id_ingrediente`),
  CONSTRAINT `plato_ingrediente_ibfk_1` FOREIGN KEY (`id_plato`) REFERENCES `platos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `plato_ingrediente_ibfk_2` FOREIGN KEY (`id_ingrediente`) REFERENCES `ingredientes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plato_ingrediente`
--

LOCK TABLES `plato_ingrediente` WRITE;
/*!40000 ALTER TABLE `plato_ingrediente` DISABLE KEYS */;
INSERT INTO `plato_ingrediente` VALUES (8,7),(6,20),(1,24),(4,24),(6,24),(9,24),(6,25),(6,27),(6,28),(6,29),(8,29),(6,33),(10,33),(2,34),(10,34),(2,35),(2,37),(2,38),(2,39),(8,39),(2,40),(1,67),(1,68),(1,69),(4,70),(4,71),(4,72),(5,73),(5,74),(5,75),(5,76),(7,78),(7,80),(7,81),(7,82),(8,83),(8,84),(8,85),(8,86),(8,87),(9,88),(9,89),(9,90),(9,91),(9,92),(9,93),(10,94),(10,95),(10,96),(10,97),(10,98),(10,99);
/*!40000 ALTER TABLE `plato_ingrediente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `platos`
--

DROP TABLE IF EXISTS `platos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `platos` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `descripcion` text,
  `precio` decimal(8,2) NOT NULL,
  `categoria` varchar(50) DEFAULT NULL,
  `ingredientes` text,
  `imagen` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `platos`
--

LOCK TABLES `platos` WRITE;
/*!40000 ALTER TABLE `platos` DISABLE KEYS */;
INSERT INTO `platos` VALUES (1,'Pabellon Criollo Venezolano','Es el plato nacional de Venezuela, una combinación de arroz blanco, carne mechada, caraotas negras (frijoles negros) y tajadas (plátanos maduros fritos).',40.00,'Plato Venezolano','Arroz, Caraotas, Platano frito, Carne Mechada','1752621627676-pabellonCriolloPlatos.png'),(2,'Cachapa Venezolana con queso','Es una especie de panqueque o torta hecha a base de maíz tierno molido, cocinada a la plancha y generalmente rellena de queso, especialmente queso de mano, y mantequilla',12.00,'Plato Venezolano','Maiz, Azucar, Mantequilla, Queso Blanco, Huevo, Leche','1752630919617-platoCachapa.png'),(4,'Arroz con mariscos','Es un tradicional plato peruano que un sofrito delicioso con un caldo increíble y una textura muy cremosa y melosa',50.00,'Plato Peruano','Arroz, Camarones, Anillos de calamar, Queso Parmesano','1752632541357-arroz con marisco.png'),(5,'Ceviche Peruano','El ceviche peruano es un plato tradicional de pescado fresco marinado en jugo de limón, acompañado de cebolla, ají y otras guarniciones.',10.00,'Entrada Peruana','Pescado de corvina, Leche de Tigre, Maiz(choclo) cocido, Camote','1752633712292-ceviche.png'),(6,'Lomo Saltado','Lomo saltado peruano, servido con papas fritas y arroz con un toque de aji',40.00,'Plato Peruano','Carne de Res, Arroz, Papas Fritas, Cebolla Morada, Tomate, Aji Amarillo, Cilantro','1752634443957-lomoSaltadoInicio.png'),(7,'Tequeños Venezolanos','8  tequeños venezolanos con salsas de guasacaca,tocineta y ajo.',10.00,'Entrada Venezolana','Tequeños Venezolanos, Guasacaca, Salsa de Ajo, Salsa de tocineta','1752635017426-tequenosVenezolanos.png'),(8,'Causa Rellena de Atun','Es un plato tradicional  de la gastronomía peruana, cuya base consiste en una suave y compacta masa de papa amarilla mezclada con ají amarillo y limón, lo que le otorga un equilibrio perfecto entre acidez y picor.',15.00,'Entrada Peruana','Limon, Aji Amarillo, Huevo, Aceitunas, Palta, Mayonesa, Atun, Papa','1752681484904-entradaCausa.png'),(9,'Arroz con Pato','Es un plato tradicional peruano, originario de la región de Lambayeque, que combina arroz cocido con carne de pato, generalmente aderezado con culantro, cerveza negra o chicha de jora, y otras especias.',60.00,'Plato Peruano','Arroz, Chicha de Jora, Cerveza Negra, Pato, Alverjas, Zanahoria, Pimientos','1752710658134-Arrozconpato.png'),(10,'Sancocho Venezolano','Es una sopa que mezcla diferentes carnes,gallina y tubérculos autóctonos.',20.00,'Plato Venezolano','Cilantro, Maiz, Auyama, Ocumo, Platano Verde, Yuca, Costillas de res, Pieza de Gallina','1752711705852-sopaVenezolana.png');
/*!40000 ALTER TABLE `platos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `reset_token` varchar(255) DEFAULT NULL,
  `reset_expires` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'fabiana perez','fabiana@hotmail.com','$2b$10$cK5wv4WJMrLS1EG2nxzH3uaAkn56L/e./yEqlkX6XWcA2tnAnWway',NULL,NULL),(2,'miguel natividad','miguel@gmail.com','$2b$10$8YphWNKoZH6UQ54.SjTAoun2ZhyzZ0AmsHnvR3oeMov8LsaGiEPHq','ed9c76a75a8961dbb03dcc585fc430dd3a60534867e1583c88d616c0650c5825','2025-06-29 14:14:39'),(3,'samuel ojeda','samuel@gmail.com','$2b$10$eEoe2YnXQatb3TtqRcwd0u9C0O490RcOHpk.CkfDcBQqdPyr4J7T6',NULL,NULL),(4,'emili toledo','emili@hotmail.com','$2b$10$4sdtGwgwCjN3CaJDbsX8CudFz90Zeh5S.BWn.Fhsqj1Q9IjSsmXAC',NULL,NULL),(5,'Luciano Ojeda','luciano@gmail.com','$2b$10$ccDPFEltMncfrQWWL7Q/i.EcbIdfoh5ilIJvCwgc00kXm/9xyL80m',NULL,NULL),(6,'Rosa Hernandez','rosa@gmail.com','$2b$10$Xv5kIaXf5WIiZ3MZkV.8je/IVycBBOdIwlJvLmgudnAvsGnwRXV3u',NULL,NULL),(7,'Jonny Toledo','jonny@gmail.com','$2b$10$RMCJRygp2UUBfKvOuKEnGO7CPRMbdouGZPCylDTt0WtlsRTNqtakO','247317a2ec7b684cc1aeaac23568ee70e3170bd1a20d6a4d38f38b250f597f97','2025-07-26 21:10:07');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-27 20:17:25
