import { nanoid } from "nanoid";
import { openDb } from '../db.js'; 

export const getEntries = async (req, res) => {
    try {
        const db = await openDb();
        const entries = await db.all('SELECT * FROM entries');
        res.status(200).json({ entries });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const createEntry = async (req, res) => {
    try {
        const { brand, model, registration_plate, year } = req.body;

        if (!brand || !model || !registration_plate || !year) {
            return res.status(400).json({ error: "Brand, model, registration plate, and year are required" });
        }

        const id = nanoid(15);
        const db = await openDb();
        
        await db.run(
            'INSERT INTO entries (id, brand, model, registration_plate, year_of_manufacturing) VALUES (?, ?, ?, ?, ?)',
            [id, brand, model, registration_plate, year]
        );

        res.status(201).json({ id, brand, model, registration_plate, year });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSpecificEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await openDb();
        const specificEntry = await db.get('SELECT * FROM entries WHERE id = ?', [id]);

        if (!specificEntry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        res.status(200).json({ specificEntry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const editEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const { brand, model } = req.body;

        if (!brand || !model) {
            return res.status(400).json({ error: "Brand and model are required" });
        }

        const db = await openDb();
        const entry = await db.get('SELECT * FROM entries WHERE id = ?', [id]);

        if (!entry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        await db.run('UPDATE entries SET brand = ?, model = ? WHERE id = ?', [brand, model, id]);
        const updatedEntry = await db.get('SELECT * FROM entries WHERE id = ?', [id]);

        res.status(200).json({ updatedEntry });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const deleteEntry = async (req, res) => {
    try {
        const { id } = req.params;
        const db = await openDb();
        const entry = await db.get('SELECT * FROM entries WHERE id = ?', [id]);

        if (!entry) {
            return res.status(404).json({ error: "Entry not found" });
        }

        await db.run('DELETE FROM entries WHERE id = ?', [id]);
        const newEntryList = await db.all('SELECT * FROM entries');
        
        res.status(200).json({ newEntryList });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};