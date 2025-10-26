// 代码生成时间: 2025-10-27 03:11:35
import { ensureDirSync, readJsonSync, writeJsonSync } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std/path/mod.ts";

// Define a VirtualMachine type to represent a virtual machine
interface VirtualMachine {
    id: string;
    name: string;
    state: "running" | "stopped";
}

class VirtualizationManager {
    private vmDir: string = join(Deno.cwd(), "vms");
    private vms: VirtualMachine[] = [];

    constructor() {
        ensureDirSync(this.vmDir);
        this.loadVms();
    }

    // Load virtual machines from a JSON file
    private loadVms(): void {
        try {
            const vmsJson = readJsonSync(join(this.vmDir, "vms.json"));
            this.vms = vmsJson;
        } catch (error) {
            if (error instanceof Deno.errors.NotFound) {
                // If the file does not exist, create it with an empty array
                writeJsonSync(join(this.vmDir, "vms.json"), []);
            } else {
                throw error;
            }
        }
    }

    // Save virtual machines to a JSON file
    private saveVms(): void {
        writeJsonSync(join(this.vmDir, "vms.json"), this.vms);
    }

    // Create a new virtual machine
    public createVM(name: string): VirtualMachine {
        const vm: VirtualMachine = {
            id: crypto.randomUUID(),
            name: name,
            state: "stopped"
        };
        this.vms.push(vm);
        this.saveVms();
        return vm;
    }

    // Start a virtual machine
    public startVM(id: string): VirtualMachine | null {
        const vm = this.vms.find((vm) => vm.id === id);
        if (!vm) {
            return null;
        }
        vm.state = "running";
        this.saveVms();
        return vm;
    }

    // Stop a virtual machine
    public stopVM(id: string): VirtualMachine | null {
        const vm = this.vms.find((vm) => vm.id === id);
        if (!vm) {
            return null;
        }
        vm.state = "stopped";
        this.saveVms();
        return vm;
    }

    // List all virtual machines
    public listVMs(): VirtualMachine[] {
        return this.vms;
    }
}

// Example usage
(async () => {
    const manager = new VirtualizationManager();
    const newVM = manager.createVM("MyVM");
    console.log("Created VM:", newVM);
    const startedVM = manager.startVM(newVM.id);
    console.log("Started VM:", startedVM);
    const stoppedVM = manager.stopVM(newVM.id);
    console.log("Stopped VM:", stoppedVM);
    console.log("All VMs:", manager.listVMs());
})();
