const express = require('express');
const sqlite3 = require('sqlite3');
const app = express();
const db = new sqlite3.Database('./Database/Bandtable.sqlite');

app.use(express.json());

db.run(`CREATE TABLE IF NOT EXISTS Band (
    ID INTEGER PRIMARY KEY,
    Name TEXT,
    Genre TEXT,
    FormationYear TEXT,
    Member TEXT,
    Pic TEXT

)`);

db.run(`CREATE TABLE IF NOT EXISTS Album (
    ID INTEGER PRIMARY KEY,
    Albumname TEXT,
    Year TEXT,
    Song TEXT,
    Pic TEXT
)`);

db.run(`CREATE TABLE IF NOT EXISTS Bandalbum (
    ID INTEGER PRIMARY KEY,
    bandID TEXT,
    albumID TEXT

   
)`);



app.get('/Band', (req, res ) => {
    db.all('SELECT * FROM Band', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Band/:id', (req, res) => {
    db.get('SELECT * FROM Band WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Band Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Band', (req, res) => {
    const band = req.body;
    db.run('INSERT INTO Band (Name, Genre, FormationYear, Member, Pic) VALUES (?, ?, ?, ?, ?)', band.Name, band.Genre, 
    band.FormationYear, band.Member, band.Pic, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            band.ID = this.lastID;
            res.send(band);
        }
    });

});

app.put('/Band/:id', (req, res) => {
    const band = req.body;
    db.run('UPDATE band SET Name = ?, Genre = ?, FormationYear = ? , Member = ?  , Pic = ? WHERE ID = ?', band.Name, band.Genre, 
    band.FormationYear, band.Member, band.Pic , req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(band);
        }
    });
});

app.delete('/band/:id', (req, res) => {
    db.run('DELETE FROM band WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

// CRUD สำหรับ Habitat
app.get('/Album', (req, res) => {
    db.all('SELECT * FROM Album', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Album/:id', (req, res) => {
    db.get('SELECT * FROM Album WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Album Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Album', (req, res) => {
    const album = req.body;
    db.run('INSERT INTO Album (Albumname, Year, Song , Pic) VALUES (?, ?, ?, ?)', album.Albumname, 
    album.Year, album.Song, album.Pic ,function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            album.ID = this.lastID;
            res.send(album);
        }
    });
});

app.put('/Album/:id', (req, res) => {
    const album = req.body;
    db.run('UPDATE album SET Albumname = ?, Year = ?, Song = ?, Pic = ? WHERE ID = ?', album.Albumname, album.Year, 
    album.Song,album.Pic , req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send(album);
        }
    });
});

app.delete('/Album/:id', (req, res) => {
    db.run('DELETE FROM Album WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});

app.get('/Bandalbum', (req, res) => {
    db.all('SELECT * FROM Bandalbum', (err, rows) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(rows);
        }
    });
});

app.get('/Bandalbum/:id', (req, res) => {
    db.get('SELECT * FROM Bandalbum WHERE ID = ?', req.params.id, (err, row) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (!row) {
                res.status(404).send('Bandalbum Not found');
            } else {
                res.json(row);
            }
        }
    });
});

app.post('/Bandalbum', (req, res) => {
    const bandalbum = req.body;
    db.run('INSERT INTO Bandalbum (bandID, albumID) VALUES (?,?)', bandalbum.bandID, bandalbum.albumID, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            bandalbum.ID = this.lastID;
            res.send(bandalbum);
        }
    });
});


app.put('/Bandalbum/:id', (req, res) => {
    const bandalbum = req.body;
    db.run('UPDATE bandalbum SET bandID = ?, albumID = ? WHERE ID = ?',  
    bandalbum.bandID, bandalbum.albumID, req.params.id, 
        function (err) {
            if (err) {
                res.status(500).send(err);
            } else {
                res.send(bandalbum);
            }
        }
    );
});

app.delete('/Bandalbum/:id', (req, res) => {
    db.run('DELETE FROM Bandalbum WHERE ID = ?', req.params.id, function (err) {
        if (err) {
            res.status(500).send(err);
        } else {
            res.send({});
        }
    });
});


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}...`);
});
