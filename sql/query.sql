INSERT INTO
    CARS (brand, model, year, price, color, condition, sold)
VALUES
    (
        'Ford',
        'Escort RS2000',
        1978,
        39000,
        'blue',
        4,
        FALSE
    ),
    (
        'Aston Martin',
        'V8 Vantage',
        1977,
        145000,
        'dark green',
        5,
        FALSE
    );
    UPDATE CARS SET
    color = 'violet'
    WHERE brand = 'Porsche'
    AND model = '356B';

    SELECT * FROM CARS;
