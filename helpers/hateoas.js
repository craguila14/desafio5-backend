const HATEOAS = async (entity, data) => {

    const results = data.map((item) => {
        return {
            name: item.nombre,
            href: `joyas/joya/${item.id}`
        }
    })
    const total = data.length

    const totalStock = data.reduce((accumulator, item) => accumulator + item.stock, 0);

    const dataWithHateoas = {
        total,
        totalStock,
        results,
        
    }
    return dataWithHateoas
}

export default HATEOAS;