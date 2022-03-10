const pool = require('../config/database');

module.exports = {
    register: async (req, res) => {
        const { email, password } = req.body

        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query("CALL insertUser(?,?)", [email, password]);
            return res.status(200).json({ success: result });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body

        let connexion;
        try {
            connexion = await pool.getConnection();
            const result = await connexion.query("CALL checkCredentials(?,?)", [email, password]);
            const data = result[0][0];
            req.session.uid = data.id;
            req.session.email = data.email;
            console.log(req.session);
            return res.status(200).json({ success: data });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        } finally {
            if (connexion) connexion.end();
        }
    },
    checkLoginStatus: async (req, res) => {
        const { uid, email } = req.session;
        if (uid && email) {
            return res.status(200).json({ success: { uid, email } });
        }
        return res.status(403).send();
        
    },
    checkSession: async (req, res, next) => {
        const { uid, email } = req.session;
        if (uid && email) {
            return next();
        }
        return res.status(403).send();

    },
    logout: (req, res) => {
        if (req?.session?.uid) {
            req.session.destroy();
            return res.status(200).send()
        }
        return res.status(401).send()
    }
}
