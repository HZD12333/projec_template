import { networkInterfaces } from 'os';

const getIpAddress = () => {
    const interfaces = networkInterfaces();
    for (let i in interfaces) {
        const items = interfaces[i] as any[];
        for (let j = 0, len = items.length; j < len; ++j) {
            const item = items[j];
            if (item.family === 'IPv4' && !item.internal) {
                return item.address;
            }
        }
    }
};
const server = {
    open: true,
    host: getIpAddress(),
    port: 9900,
    proxy: {},
};
export default server;