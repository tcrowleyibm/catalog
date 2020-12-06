DROP TABLE CHARTERS;
CREATE TABLE CHARTERS (
    charter_id SERIAL PRIMARY KEY,
    charter_name VARCHAR(128) NOT NULL,
    charter_descr VARCHAR(254) NOT NULL
);

INSERT INTO CHARTERS (charter_name, charter_descr) VALUES('Inshore 1', 'Inshore half day fishing with guide.');
INSERT INTO CHARTERS (charter_name, charter_descr) VALUES('Inshore 2', 'Inshore full day fishing with guide. Lunch provided.');
INSERT INTO CHARTERS (charter_name, charter_descr) VALUES('Offshore 1', 'Offshore half day fishing with guide.');
