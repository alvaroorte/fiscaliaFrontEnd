import { MessageService } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class HelpersService {
    
    constructor(private messageService: MessageService) {}

    messageNotification(severity: string | null, title: string | null,  detail: string | null, life: number | null) {
        severity = severity? severity: "error";
        title = title? title: "Error";
        detail = detail? detail: "Algo salio mal";
        life = life? life: 3000;
        return (this.messageService.add({ severity: severity, summary: title, detail: detail, life: life }));
    }

    isNull(obj: any) {
        if (typeof obj === 'undefined' || obj === null || obj == "")
            return true;
        else
            return false;
    }
}