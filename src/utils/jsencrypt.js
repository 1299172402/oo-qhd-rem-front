import JSEncrypt from 'jsencrypt/bin/jsencrypt'

// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = `MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAvGqR2QqERJkFRCD/8i/9
nDioWOq4xyDzIgWtSJWMmpsOQIC20rxdteVPa6UgJHZm3matHirRkixqFIceXjIf
K1UZQp8+ivsVqmZS3uCSqVXxHq/Y8aKG3h2ds2b3ddViffpKqFJZOL9Q0zlzYofy
uwqd5ZnH+ESPUzVYV9qfUF8f9DlLIW2LYrbnAFWGN+OQ3yovsvMxxSTV9V/Yrb6Z
NtfqiNJkHCPCh01g6WaP1ko1WjUTdFGisa06UJnDHU9Kq/V8AoI3umt2jSnWneO3
hzkWI1d87Cmyt90kgU+N8f6ld1GFOvxaNW+nuq/e/RJff18tO3V+04m9uzBVkJmT
+wIDAQAB`

const privateKey = `MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC8apHZCoREmQVE
IP/yL/2cOKhY6rjHIPMiBa1IlYyamw5AgLbSvF215U9rpSAkdmbeZq0eKtGSLGoU
hx5eMh8rVRlCnz6K+xWqZlLe4JKpVfEer9jxoobeHZ2zZvd11WJ9+kqoUlk4v1DT
OXNih/K7Cp3lmcf4RI9TNVhX2p9QXx/0OUshbYtitucAVYY345DfKi+y8zHFJNX1
X9itvpk21+qI0mQcI8KHTWDpZo/WSjVaNRN0UaKxrTpQmcMdT0qr9XwCgje6a3aN
Kdad47eHORYjV3zsKbK33SSBT43x/qV3UYU6/Fo1b6e6r979El9/Xy07dX7Tib27
MFWQmZP7AgMBAAECggEAK3GLFXdGTibWPwI44ZfNKyMpNe9REaD4ToTukojg9ZkA
7UCAZxDFrrYj3NcjFSUzzN3x1r3aupCBGSCakO+Pnkct3t2m5xbDxRl4zCkNx/un
8AJtzDFEVZyQixgXwNSltBRs+GicZ+g886cQgsyD3Dqzc4hEwmrUfUQUjZU8HKSc
fDacNma9XFJvJt2IKLWlQh74TIWBJos5oXHgKR7WhLAfTUEe8nI8GgER4c2kVOvO
SPUWpC/Zj0h7knAzf+R10xLzgeIK8aYG1k3xOU1A8jiiw0+fWbFa3/JgRpQkVTKq
N0t93GI+qaNuxPgj1lylDkj103dkD7+XWVFazssQIQKBgQDz6Kz0HX6NopgB3Y2Y
JqVyGgTogC3mvQZJ0TEYaq2fulnBwtXIhHVuGk8Jh9Bo5QudvuE/oY8sGiUKRlNZ
WkFeyDNKUdxyFl7p2HO/rnYQeJBRsl2zkCs2FOjqcTmRgOzqrKxBXDjON+4FXR1x
HZma6btTd+1JAfpgMmam8+4rsQKBgQDFwapi9XMWKW5o1RxHwCGKb58/lVanrtC7
qtLROGSwCW7/OhhjWs7MBvyu2e28gfAVLf+4fgchcVQhJmsb6kHZ8JZBZb2g2Xt9
b6mLSLNt+VZUzI3Kn+ZaU0Zavk2bG69lNG6XyFTvsRl44usjGjui+WPg3zXiLVHq
6TkEp4OhawKBgQDC9wAY+eKJEKj1BMYEExA4jrfRqXQHdp0qMD9QRyWWAf1xNm5w
pADCC+GVuqxKzJtmcofWtyuckyF8fw5s5ApQ2zK0e4782wjvX4fWdnwFWnnx8+OW
fu0rg7dSf0MHHclDJNdkP3Vg0bA/NVkta/22qJKGe9x+eUhL0L3hQiblYQKBgE4n
F1s8fVsIzKWJcz+34ol/S4QpVLG4GK3R+LbOfpxDXiZnozPAs3FWYY4IejfBckws
fZ8/zzmcPA9Ny46gqZ2jwv3dY2+qA2+zLWHqPV785u1kWbT2NGcF+gvqoWjnLA3n
Br3dYhPH/bUUmLCqsV7bCGnaTMUx++nGec4pFZA5AoGAH9+boczQhGp9Bjt5XoVr
C6FqHwkjTY3jR4/7B77HDj/ShGHnptmwGcyiDRSuScUyvIPxs2OnbyPCV8l3SKx/
RTL5qvDZvWmHROfRncHVjIxM/mXZZRtEGKcJcaU4azIzygC2c4szWXihY16RWsKH
NYB7uG1uA4/+4+g++Qval54=`

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}
// 加密(登录)
export function encryptlogin(txt,publicKey) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
