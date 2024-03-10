
import fs from 'fs';
import path from 'path';

export default (req: any, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const filePath = path.resolve('src/campaign-emails.json');

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    try {
      const jsonData = JSON.parse(data);
      return res.status(200).json(jsonData);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return res.status(500).json({ message: 'Error parsing JSON' });
    }
  });
};