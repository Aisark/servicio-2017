
-- Estructura de la tabla 'MAESTROS' en BD 'Users'
CREATE TABLE MAESTROS
  (NOMBRE VARCHAR(30),
   AP_PAT VARCHAR(10),
   AP_MAT VARCHAR(10),
   PWORD VARCHAR(15),
   USERNAME VARCHAR(8) UNIQUE
 );

-- Estructura de la tabla 'ALUMNOS' en BD 'Users'
CREATE TABLE ALUMNOS
   (NUMCON INT UNIQUE,
    NOMBRE VARCHAR(30),
    AP_PAT VARCHAR(10),
    AP_MAT VARCHAR(10),
    PWORD VARCHAR(15),
    USERNAME VARCHAR(8) UNIQUE,
    EDAD INT,
    SEXO VARCHAR(1),
    ID_MAESTRO INTEGER,
    MAX_LVL_ECU VARCHAR(3),
    ECU_RESOL INT,
    ECU_FAIL INT,
    TIME_GAME INT,
    CHECK (SEXO IN ('H','h','m','M')),
    CHECK (MAX_LVL_ECU IN ('FAC','MED','DIF')),
    FOREIGN KEY (ID_MAESTRO) REFERENCES MAESTROS(rowid)
  );