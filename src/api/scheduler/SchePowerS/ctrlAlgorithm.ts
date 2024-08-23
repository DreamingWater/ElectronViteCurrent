
class PIDController {
    private Kp: number;
    private Ki: number;
    private Kd: number;
    private previousError: number = 0.0;
    private integralErrors: number[] = [0];
    private maxErrorHistory: number = 20;

    private exceeding_Limit: boolean = false;

    constructor(Kp: number, Ki: number, Kd: number) {
        this.Kp = Kp;
        this.Ki = Ki;
        this.Kd = Kd;
    }
    clean_traditional_data(){
        this.exceeding_Limit = false;
        this.integralErrors = [0]

    }
    check_exceeding_Limit(){
        return this.exceeding_Limit
    }
    set_pid_parameters(Kp: number, Ki: number, Kd: number) {
        this.Kp = Kp;
        this.Ki = Ki;
        this.Kd = Kd;
    }
    control_calculate(setPoint: number, measuredValue: number,output_Limitation:number): number {
        const error = setPoint - measuredValue;
        this.integralErrors.push(error);
        if (this.integralErrors.length > this.maxErrorHistory) {
            this.integralErrors.shift(); // remove the oldest error
        }
        const integral = this.integralErrors.reduce((a, b) => a + b, 0);
        const derivative = error - this.previousError;
        let output = this.Kp * error + this.Ki * integral + this.Kd * derivative;
        this.previousError = error;

        // Limit output_power to within set_point ± output_Limitation
        if (output > setPoint + output_Limitation) {
            output = setPoint + output_Limitation;
            this.exceeding_Limit =true
        } else if (output < setPoint - output_Limitation) {
            output = setPoint - output_Limitation;
            this.exceeding_Limit =true
        }

        return output;
    }
}

export const amplifier_pid_controller = new PIDController(0.1, 0.0, 0.0);