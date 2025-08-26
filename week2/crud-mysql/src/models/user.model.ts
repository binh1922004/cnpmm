import pool from '../config/db.config';
import { User } from '../interfaces/user.interface';

export class UserModel {
    async create(user: User): Promise<User> {
        const [result] = await pool.execute(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [user.username, user.email, user.password]
        );
        return { ...user, id: (result as any).insertId };
    }

    async findAll(): Promise<User[]> {
        const [rows] = await pool.execute('SELECT * FROM users');
        return rows as User[];
    }

    async findById(id: number): Promise<User | null> {
        const [rows]: any = await pool.execute(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );
        return rows[0] || null;
    }

    async update(id: number, user: Partial<User>): Promise<boolean> {
        const [result] = await pool.execute(
            'UPDATE users SET username = ?, email = ? WHERE id = ?',
            [user.username, user.email, id]
        );
        return (result as any).affectedRows > 0;
    }

    async delete(id: number): Promise<boolean> {
        const [result] = await pool.execute(
            'DELETE FROM users WHERE id = ?',
            [id]
        );
        return (result as any).affectedRows > 0;
    }
}