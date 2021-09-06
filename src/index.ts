import * as admin from 'firebase-admin'
import {DatabaseService} from "./import/database-service";
import {ImportService} from "./import/import-service";

const params = {
    type: "service_account",
    project_id: "test-cb955",
    private_key_id: "8e988b31cfe489a63f5d953eadf3c5399ecd04c3",
    private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDppU1rpn3P1YGo\n1I08s8pJLheZc61LifNvCRe5YI0ARg5md8obbLMlDPYoLHeyyBao534Ui+jAzewr\nM1S7KLUaG/0flnS4nv2K23JvPubNUYUPk63ypiinNyMCZGLlepiX6FjtvP3SB00v\npeixw/7o90nQGTpi2WDYkZXxjVocEw20wGs8qPsyXZXOKLauYzTSkosRkg5Ob5aw\nhk8wXc/ZCcULiFT+N9MHeLItaoztNrJ+Hi6y3YrBXAlmIB/ugHCL0jrY8AdJR08s\n+8lfDXwN0kY334jPZgXTXzm8KVONcg6p+K4XSi5SPc1YoGf9n3nqARIV1+9o0/ZK\nlroZwMPfAgMBAAECggEAFL1tMWyeh2fq8gsoHGbTQoq6Yo8/p1BwEP+sIPL+oTMW\nzSa+BJAyGMxdP3SvDWowhL7D1NwUhaTh3XXZhCGZbd9lKTwoUUkftYdEUbayMzCU\n0KypyLvSKQG+dFRn6PnoeLeRyUy49T9brSqbjMgapSBqZ3QN2D92ltLZjg8fnBUz\neuIAQt6qayGZ2oZ5kZH798Hz3eeRfSZscaRiOmjyGkrk78Q2YyXOuOkBNswYhStj\na6Y/ATzRLK9ub+fqP8j21IAHc7GLwugbTFgKXFy06CQYIcg5E9rHjXpknculdGPo\nTOyH7yMP/cqVwO3JDJ1FE75McorV05B0zu/t6J6zPQKBgQD21w0pMZ4lDP+tau49\nXYD1wUo0HXUDcv3qVVP1+jkKqM1gJrmR4Dc2eJ8+lg7ra4fzyC/xs6xvxzzYdKVd\ntJH8iDFDsF91Muac5uBZH+o6pCMcHTJ4rMuFHjrGetw2VqN0j/7zNFaURONR11Vd\nAI4ivtK681pzK6mjIXe12OqZowKBgQDyUOgUb/5N6jkZHiXadJHTRCfyRquDiB/G\niVJYj30LRzTs1zQZat7ua4Z5bj5U3COkBRasFq0o55GqS269DACwMVs4KpEqrWjD\nJuokyDX3xuMZvV6WBHdeZOxiLDuy9keQUVdmuCJ7zhe5gfk3X0Xws7wHUP2+fjyM\ncCKQ2PrIlQKBgFl3tPN7YoC3Z2yp11Qyse1hc83T53eqlFH9P4NmgIpWiKoTHyu6\ngwihS8bZiOrXfN1lb8tBfny9UFZ8YPvH2SoZCxInuVG3c1Lnc+WZ5cH/gCJOit6m\nctX7EP6jxXGEkZZMIvJvw/nVxjcBv5UIAHyjgan1TpFz//Z6yPMGfnHVAoGAEktx\nejmKZa+NaAwSp4+tgtneejhDssaQP5kWkoEi27sgj9EfqdubwTx1Bq4AHsAQIM4R\njCSaJkB1ivnu/m7tjl/rly3/j81P34wMmYJUMMTfWI4nmgP0TzgncLIOP9DATnEV\nvDeiwt4ohGT/v+J9kVLAm3zN65f0UlYVBgKbzJECgYBSZsXXIyLTb2XxMjQLXOMh\ncfiAhgk5QJ3sQ3BgxIK1N1yGU1RiDSLuLuMZI62x1tncEipSvyT0TJuKWgG7nflQ\np23x5KtxFtB0p3DXhlCoF6yoOSYCNJPPDPxAhj0iXITpB8LYxpIi+6vCvxE1K3dU\n89UdqC/oMJQlfNZtTG0DPw==\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-ycai2@test-cb955.iam.gserviceaccount.com",
    client_id: "118409361764057885315",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-ycai2%40test-cb955.iam.gserviceaccount.com"
}

admin.initializeApp({
    credential: admin.credential.cert(params as any),
})

let databaseService = new DatabaseService()
let importService = new ImportService(databaseService)

const jsonData = "{\"config/\":  {\"default\": {\"bundlesVersions\": {\"translations_1\": 0},\"bundles/\": {\"translations_1\": {\"alkjlkj\": [0, 1, 2]}}}}, \"config2/\": {\"moje\": {\"xd\": [1,2]}}}"
const json = JSON.parse(jsonData);

importService.importData(json)
