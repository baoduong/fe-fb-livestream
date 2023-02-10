import { HttpClient } from '@angular/common/http';
import { IP_PRINTER, PORT_PRINTER } from '../const';
import { Injectable } from '@angular/core';

declare const epson: any;

/**
 * Printer service
 */
@Injectable({ providedIn: 'root' })
export class PrinterService {

    public printer: any;
    template: any;
    _printer: any;
    constructor(private http: HttpClient) { }

    async init() {
        // const adapter = new Network(IP_PRINTER, PORT_PRINTER);
        // this._printer = await new Printer(adapter).open()
    }

    connect() {
        const epsonDev = new epson.ePOSDevice();
        epsonDev.connect(IP_PRINTER, PORT_PRINTER, (data: any) => {
            console.log('data', data)
            if ((data == 'OK') || (data == 'SSL_CONNECT_OK')) {
                epsonDev.createDevice('', epsonDev.DEVICE_TYPE_PRINTER, {
                    crypto: false,
                    buffer: false
                })
            } else {
                console.log("connect failed. [" + data + "]");
            }
        });
    }

    cbCreateDevicePrinter(data: any, code: any) {
        if (data === null) {
            return;
        }

        console.log("you can use printer.");
        this.printer = data;
        this.printer.onreceive = function (res: any) {
            // Show message
            console.log('Print' + (res.success ? 'Success' : 'Failure') + '\nCode:' + res.code + '\nBattery:' + res.battery + '\n' + this.getStatusText(this.printer, res.status), true);
        };
    }

    getStatusText(e: any, status: any) {
        var s = 'Status: \n';
        if (status & e.ASB_NO_RESPONSE) {
            s += ' No printer response\n';
        }
        if (status & e.ASB_PRINT_SUCCESS) {
            s += ' Print complete\n';
        }
        if (status & e.ASB_DRAWER_KICK) {
            s += ' Status of the drawer kick number 3 connector pin = "H"\n';
        }
        if (status & e.ASB_OFF_LINE) {
            s += ' Offline status\n';
        }
        if (status & e.ASB_COVER_OPEN) {
            s += ' Cover is open\n';
        }
        if (status & e.ASB_PAPER_FEED) {
            s += ' Paper feed switch is feeding paper\n';
        }
        if (status & e.ASB_WAIT_ON_LINE) {
            s += ' Waiting for online recovery\n';
        }
        if (status & e.ASB_PANEL_SWITCH) {
            s += ' Panel switch is ON\n';
        }
        if (status & e.ASB_MECHANICAL_ERR) {
            s += ' Mechanical error generated\n';
        }
        if (status & e.ASB_AUTOCUTTER_ERR) {
            s += ' Auto cutter error generated\n';
        }
        if (status & e.ASB_UNRECOVER_ERR) {
            s += ' Unrecoverable error generated\n';
        }
        if (status & e.ASB_AUTORECOVER_ERR) {
            s += ' Auto recovery error generated\n';
        }
        if (status & e.ASB_RECEIPT_NEAR_END) {
            s += ' No paper in the roll paper near end detector\n';
        }
        if (status & e.ASB_RECEIPT_END) {
            s += ' No paper in the roll paper end detector\n';
        }
        if (status & e.ASB_BUZZER) {
            s += ' Sounding the buzzer (certain model)\n';
        }
        if (status & e.ASB_SPOOLER_IS_STOPPED) {
            s += ' Stop the spooler\n';
        }
        return s;
    }

    printTest() {
        this.printer.addText(this.escapeText('Hello,\tWorld!\n'));
        this.printer.send();
    }

    private escapeText(s: string) {
        var escape = /\\[tnr\\]|\\/g;
        if (escape.test(s)) {
            s = s.replace(escape, function (c) {
                var r = '';
                switch (c) {
                    case '\\t':
                        r = '\x09';
                        break;
                    case '\\n':
                        r = '\x0a';
                        break;
                    case '\\r':
                        r = '\x0d';
                        break;
                    case '\\\\':
                        r = '\\';
                        break;
                    default:
                        break;
                }
                return r;
            });
        }
        return s;
    }

    private generateBuffer(template: string, data: any) { }

    async sendMessageToPrint(message: string) {

    }

    async testPrint() {
        
    }

}