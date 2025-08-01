const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const path = require('path');

// Chemin vers la base de données
const dbPath = path.join(__dirname, '..', 'db', 'portfolio.db');

async function initDatabase() {
  console.log('🚀 Initialisation manuelle de la base de données...');
  
  const db = new sqlite3.Database(dbPath);
  
  try {
    // Créer les tables admin
    await createTables(db);
    
    // Créer le compte admin
    await createAdmin(db);
    
    // Nettoyer les sessions
    await cleanupSessions(db);
    
    console.log('✅ Initialisation terminée avec succès!');
    
  } catch (error) {
    console.error('❌ Erreur:', error);
  } finally {
    db.close();
  }
}

function createTables(db) {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Table admin_users
      db.run(`
        CREATE TABLE IF NOT EXISTS admin_users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          email TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          name TEXT,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          updated_at TEXT DEFAULT CURRENT_TIMESTAMP
        )
      `, (err) => {
        if (err) {
          console.error('Erreur table admin_users:', err);
          reject(err);
          return;
        }
        console.log('✅ Table admin_users OK');
      });
      
      // Table admin_sessions
      db.run(`
        CREATE TABLE IF NOT EXISTS admin_sessions (
          id TEXT PRIMARY KEY,
          user_id INTEGER REFERENCES admin_users(id) ON DELETE CASCADE,
          created_at TEXT DEFAULT CURRENT_TIMESTAMP,
          expires_at TEXT NOT NULL
        )
      `, (err) => {
        if (err) {
          console.error('Erreur table admin_sessions:', err);
          reject(err);
          return;
        }
        console.log('✅ Table admin_sessions OK');
      });
      
      // Colonne media_urls si elle n'existe pas
      db.run(`
        ALTER TABLE proof_items ADD COLUMN media_urls TEXT
      `, (err) => {
        if (err && !err.message.includes('duplicate column name')) {
          console.error('Erreur colonne media_urls:', err);
        } else if (!err) {
          console.log('✅ Colonne media_urls ajoutée');
        }
        resolve();
      });
    });
  });
}

function createAdmin(db) {
  return new Promise(async (resolve, reject) => {
    // Vérifier si admin existe
    db.get('SELECT COUNT(*) as count FROM admin_users', async (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      
      if (row.count > 0) {
        console.log('👤 Compte admin déjà existant');
        resolve();
        return;
      }
      
      // Créer l'admin
      const email = 'aurelieuxpro@gmail.com';
      const password = 'Aurelieux23&_';
      const name = 'Aurelien Admin';
      
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        
        db.run(
          'INSERT INTO admin_users (email, password, name) VALUES (?, ?, ?)',
          [email, hashedPassword, name],
          (err) => {
            if (err) {
              reject(err);
              return;
            }
            console.log('✅ Compte admin créé');
            console.log('📧 Email:', email);
            console.log('🔑 Mot de passe:', password);
            resolve();
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  });
}

function cleanupSessions(db) {
  return new Promise((resolve, reject) => {
    const now = new Date().toISOString();
    
    db.run(
      'DELETE FROM admin_sessions WHERE expires_at < ?',
      [now],
      function(err) {
        if (err) {
          console.error('Erreur nettoyage sessions:', err);
          // Ne pas faire échouer pour ça
        } else if (this.changes > 0) {
          console.log(`🧹 ${this.changes} sessions expirées supprimées`);
        } else {
          console.log('🧹 Aucune session expirée');
        }
        resolve();
      }
    );
  });
}

// Exécuter si appelé directement
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase };