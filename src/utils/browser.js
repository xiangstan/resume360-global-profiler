import { UAParser } from "ua-parser-js"

/*** fetch user client system info */
export default function browserDetect() {
  const { browser, cpu, device, os } = UAParser()
  return {
    browser: browser,
    cpu: cpu,
    device: device,
    os: os
  }
}