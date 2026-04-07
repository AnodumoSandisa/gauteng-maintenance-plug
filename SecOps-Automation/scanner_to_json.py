import nmap
import json
from datetime import datetime

def run_security_scan(target_ip):
    nm = nmap.PortScanner()
    print(f"[*] Starting ServiceNow-Ready Scan on: {target_ip}")
    
    
    nm.scan(target_ip, '21, 22, 80, 443') 

    
    incident_data = {
        "source": "Python-SecOps-Automation",
        "scan_timestamp": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        "target_system": target_ip,
        "status": nm[target_ip].state() if target_ip in nm.all_hosts() else "Unknown",
        "vulnerabilities": []
    }

    if target_ip in nm.all_hosts():
        for proto in nm[target_ip].all_protocols():
            ports = nm[target_ip][proto].keys()
            for port in ports:
                service = nm[target_ip][proto][port]
                
                ticket_item = {
                    "port": port,
                    "service": service['name'],
                    "state": service['state'],
                    "description": f"Service {service['name']} is active on port {port}"
                }
                incident_data["vulnerabilities"].append(ticket_item)

    return incident_data

if __name__ == "__main__":
    
    target = "127.0.0.1" 
    
    try:
        results = run_security_scan(target)
        
        
        with open("service_now_payload.json", "w") as f:
            json.dump(results, f, indent=4)
            
        print("\n[+] SUCCESS: 'service_now_payload.json' has been created.")
        print("[+] This file is now ready for GitHub/ServiceNow Portfolio.")
    except Exception as e:
        print(f"[-] Scan Error: {e}")