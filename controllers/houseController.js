
exports.estimate = (req, res, next) => {
    try {
        const house = req.body;
        estimate(house, price => {
            house.finalPrice = price;
            res.status(200).send(house)
        })
    } catch (error) {
        next(error)
    }
};

function estimate(house, result){
    let base = house.area * house.pricePerM;
    // pourcentage ajouté sur le nombre de pièce
    if(house.roomNumber <= 2) {
        base = base + base * 5 / 100;
    }else if(house.roomNumber <= 4) {
        base = base + base * 2 / 100;
    }else {
        base = base - base * 1 / 100;
    }
    // pourcentage ajouté sur le type
    if (house.type == 'house'){
        base = base + base * 3 / 100;
    }else if(house.type == 'apartment') {
        base = base + base * 5 / 100;
    }
    // pourcentage ajouté sur l'état
    switch (house.state) {
        case 'new': 
            base = base + base * 12 / 100;
            break;
        case 'requires-maintenance': 
            base = base - base * 10 / 100;
            break;
    }
    return result(base);
}