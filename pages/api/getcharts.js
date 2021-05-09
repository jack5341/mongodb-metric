export default (req, res) => {
    if(req.method === "POST") {
        console.log(req.body)
    }
    res.status(200).json({ name: 'John Doe' })
}  