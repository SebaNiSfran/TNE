import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private dbInstance: SQLiteObject | null = null;
  readonly db_name: string = "tne_database.db";
  readonly db_table_revalidar: string = "revalidar_tne";
  readonly db_table_recuperar: string = "recuperar_tne";

  constructor(
    private platform: Platform,
    private sqlite: SQLite
  ) {
    this.initializeDB();
  }

  // Inicializar la base de datos
  private async initializeDB() {
    try {
      await this.platform.ready();
      this.dbInstance = await this.sqlite.create({
        name: this.db_name,
        location: 'default'
      });
      await this.createTables();
      console.log('Base de datos inicializada');
    } catch (error) {
      console.error('Error al inicializar DB:', error);
    }
  }

  // Crear las tablas necesarias
  private async createTables() {
    const revalidarTable = `
      CREATE TABLE IF NOT EXISTS ${this.db_table_revalidar} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rut TEXT NOT NULL,
        fullName TEXT NOT NULL,
        comuna TEXT NOT NULL,
        establecimiento TEXT NOT NULL,
        email TEXT NOT NULL,
        telefono TEXT NOT NULL,
        nivelEducacional TEXT NOT NULL,
        imageDNI TEXT,
        imageCertificado TEXT,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
      )`;

    const recuperarTable = `
      CREATE TABLE IF NOT EXISTS ${this.db_table_recuperar} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        rut TEXT NOT NULL,
        fullName TEXT NOT NULL,
        comuna TEXT NOT NULL,
        establecimiento TEXT NOT NULL,
        email TEXT NOT NULL,
        telefono TEXT NOT NULL,
        nivelEducacional TEXT NOT NULL,
        isPhysical INTEGER,
        edad INTEGER,
        imageDNI TEXT,
        imageCertificado TEXT,
        imageConstancia TEXT,
        imageComprobante TEXT,
        fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP
      )`;

    try {
      await this.dbInstance?.executeSql(revalidarTable, []);
      await this.dbInstance?.executeSql(recuperarTable, []);
      console.log('Tablas creadas correctamente');
    } catch (error) {
      console.error('Error al crear tablas:', error);
    }
  }

  // Métodos para Revalidar TNE
  async guardarRevalidacion(data: any) {
    const sql = `INSERT INTO ${this.db_table_revalidar} 
      (rut, fullName, comuna, establecimiento, email, telefono, nivelEducacional, imageDNI, imageCertificado) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      data.rut, 
      data.fullName, 
      data.comuna, 
      data.establecimiento,
      data.email,
      data.telefono,
      data.nivelEducacional,
      data.imageDNI,
      data.imageCertificado
    ];
    
    try {
      await this.dbInstance?.executeSql(sql, values);
      return true;
    } catch (error) {
      console.error('Error al guardar revalidación:', error);
      return false;
    }
  }

  // Métodos para Recuperar TNE
  async guardarRecuperacion(data: any) {
    const sql = `INSERT INTO ${this.db_table_recuperar} 
      (rut, fullName, comuna, establecimiento, email, telefono, nivelEducacional, 
       isPhysical, edad, imageDNI, imageCertificado, imageConstancia, imageComprobante) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
      data.rut,
      data.fullName,
      data.comuna,
      data.establecimiento,
      data.email,
      data.telefono,
      data.nivelEducacional,
      data.isPhysical ? 1 : 0,
      data.edad,
      data.imageDNI,
      data.imageCertificado,
      data.imageConstancia,
      data.imageComprobante
    ];

    try {
      await this.dbInstance?.executeSql(sql, values);
      return true;
    } catch (error) {
      console.error('Error al guardar recuperación:', error);
      return false;
    }
  }

  // Obtener todos los registros de revalidación
  async getRevalidaciones() {
    try {
      const data = await this.dbInstance?.executeSql(
        `SELECT * FROM ${this.db_table_revalidar} ORDER BY fecha_creacion DESC`, 
        []
      );
      return data?.rows.raw();
    } catch (error) {
      console.error('Error al obtener revalidaciones:', error);
      return [];
    }
  }

  // Obtener todos los registros de recuperación
  async getRecuperaciones() {
    try {
      const data = await this.dbInstance?.executeSql(
        `SELECT * FROM ${this.db_table_recuperar} ORDER BY fecha_creacion DESC`, 
        []
      );
      return data?.rows.raw();
    } catch (error) {
      console.error('Error al obtener recuperaciones:', error);
      return [];
    }
  }
}
