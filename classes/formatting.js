export default (score) => score.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
