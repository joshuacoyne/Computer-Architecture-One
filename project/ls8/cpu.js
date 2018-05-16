/**
 * LS-8 v2.0 emulator skeleton code
 */

/**
 * Class for simulating a simple Computer (CPU & memory)
 */
class CPU {

    /**
     * Initialize the CPU
     */
    constructor(ram) {
        this.ram = ram;

        this.reg = new Array(8).fill(0); // General-purpose registers R0-R7
        this.reg[7] = 243;
        // Special-purpose registers
        this.PC = 0; // Program Counter

        this.operandA = null;
        this.operandB = null;
        this.PCmoved = false;
    }
    
    /**
     * Store value in memory address, useful for program loading
     */
    poke(address, value) {
        this.ram.write(address, value);
    }

    /**
     * Starts the clock ticking on the CPU
     */
    startClock() {
        this.clock = setInterval(() => {
            this.tick();
        }, 1); // 1 ms delay == 1 KHz clock == 0.000001 GHz
    }
    
    /**
     * Stops the clock
     */
    stopClock() {
        clearInterval(this.clock);
    }
    
    /**
     * ALU functionality
     *
     * The ALU is responsible for math and comparisons.
     *
     * If you have an instruction that does math, i.e. MUL, the CPU would hand
     * it off to it's internal ALU component to do the actual work.
     *
     * op can be: ADD SUB MUL DIV INC DEC CMP
     */
    alu(op, regA, regB) {
        switch (op) {
            case 'MUL':
            // !!! IMPLEMENT ME
            break;
        }
    }
    
    //handler methods
    PUSH(item) {
        this.reg[7]--;
        if (item)
            this.ram[this.reg[7]] = item;
        else
            this.ram[this.reg[7]] = this.reg[this.operandA];
    }

    POP() {
        this.reg[this.operandA] = this.ram[this.reg[7]];
        
        return this.ram[this.reg[7]++]; 
    }
    
    ADD() {
        this.reg[this.operandA] += this.reg[this.operandB];
    }

    PRN() {
        console.log(this.reg[this.operandA]);
    }

    LDI() {
        this.reg[this.operandA & 0b111] = this.operandB;
    }

    AND() {
        this.reg[this.operandA] = this.reg[this.operandA] & this.reg[this.operandB];
    }

    MUL() {
        this.reg[this.operandA] *= this.reg[this.operandB];
    }
    
    CALL() {
        // this.reg[7]--;
        // this.ram[this.reg[7]] = this.PC + 2;
        this.PUSH(this.PC + 2);
        this.PC = this.reg[this.operandA];
        this.PCmoved = true;
    }

    RET() {
        // this.PC = this.ram[this.reg[7]];
        // this.reg[7]++;
        this.PC = this.POP();
        this.PCmoved = true;
    }
    /**
     * Advances the CPU one cycle
     */
    tick() {
        // Load the instruction register (IR--can just be a local variable here)
        // from the memory address pointed to by the PC. (I.e. the PC holds the
        // index into memory of the instruction that's about to be executed
        // right now.)

        // !!! IMPLEMENT ME
        const IR = this.ram.read(this.PC);
        this.PCmoved = false;
        // Debugging output
        //console.log(`${this.PC}: ${IR.toString(2)}`);

        // Get the two bytes in memory _after_ the PC in case the instruction
        // needs them.
        this.operandA = this.ram.read(this.PC + 1);
        this.operandB = this.ram.read(this.PC + 2);
        
        // !!! IMPLEMENT ME
        //const category = (IR & 0b11000) >> 3;
        
        
        

        // Execute the instruction. Perform the actions for the instruction as
        // outlined in the LS-8 spec.

        // !!! IMPLEMENT ME
        const table = {
            0: function() {
                //do nothing
            },
            0b00000001: () => this.stopClock(),
            0b01000011: () => this.PRN(),
            0b10011001: () => this.LDI(),
            0b10101000: () => this.ADD(),
            0b10110011: () => this.AND(),
            0b10101010: () => this.MUL(),
            0b01001100: () => this.POP(),
            0b01001101: () => this.PUSH(),
            0b01001000: () => this.CALL(),
            0b00001001: () => this.RET(),
        };
        
        if (table[IR]){
            table[IR]();
        }
        else
            console.log(IR.toString(2));

        // Increment the PC register to go to the next instruction. Instructions
        // can be 1, 2, or 3 bytes long. Hint: the high 2 bits of the
        // instruction byte tells you how many bytes follow the instruction byte
        // for any particular instruction.

        if(!this.PCmoved)
            this.PC += (IR >> 6) + 1;
        
        
        // !!! IMPLEMENT ME
    }
}

module.exports = CPU;
