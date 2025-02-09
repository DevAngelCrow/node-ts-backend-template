import fs from 'fs/promises';
import path from 'path';
import process from 'process';
import { authenticate } from '@google-cloud/local-auth';
import { google, Auth } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/drive'];
const TOKEN_PATH = path.join(process.cwd(), 'token.json');
const CREDENTIALS_PATH = path.join(process.cwd(), 'credentials.json');

class GoogleAuthWrapper {
  private authClient: Auth.OAuth2Client | null = null;

  
  private async loadSavedCredentialsIfExist(): Promise<Auth.OAuth2Client | null> {
    try {
      const content = await fs.readFile(TOKEN_PATH, 'utf8');
      const credentials = JSON.parse(content);
      return google.auth.fromJSON(credentials) as Auth.OAuth2Client;
    } catch (err) {
      return null;
    }
  }

  
  private async saveCredentials(client: Auth.OAuth2Client): Promise<void> {
    const content = await fs.readFile(CREDENTIALS_PATH, 'utf8');
    const keys = JSON.parse(content);
    const key = keys.installed || keys.web;
    const payload = JSON.stringify({
      type: 'authorized_user',
      client_id: key.client_id,
      client_secret: key.client_secret,
      refresh_token: client.credentials.refresh_token,
    });
    await fs.writeFile(TOKEN_PATH, payload);
  }

 
  public async getAuthClient(): Promise<Auth.OAuth2Client> {
    if (this.authClient) return this.authClient;

    let client = await this.loadSavedCredentialsIfExist();
    if (!client) {
      client = await authenticate({
        scopes: SCOPES,
        keyfilePath: CREDENTIALS_PATH,
      });
      if (client.credentials) {
        await this.saveCredentials(client);
      }
    }
    this.authClient = client;
    return client;
  }
}

export default new GoogleAuthWrapper();
