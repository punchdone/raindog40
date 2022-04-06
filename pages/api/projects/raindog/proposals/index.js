async function handler(req, res) {
    return res.status(200).json({ message: 'This would be a list of raindog proposals' });
};

export default handler;