import { HttpException } from '@nestjs/common';
import { DevGuard } from './dev.guard';

describe('DevGuard', () => {
    const devPasswordStub = 'devPassword';
    const context = {
        switchToHttp: () => ({
            getRequest: () => ({
                body: {
                    devPassword: devPasswordStub,
                },
            }),
        }),
    } as any;

    it('should not activate for non-dev env', () => {
        const guard = new DevGuard();

        expect(() => guard.canActivate(context)).toThrow(HttpException);
    });

    it('should not activate for invalid dev auth password', () => {
        process.env = { NODE_ENV: 'development', DEV_AUTH_PASSWORD: devPasswordStub + ' ' };
        const guard = new DevGuard();

        expect(() => guard.canActivate(context)).toThrow(HttpException);
    });

    it('should activate for valid dev auth password', () => {
        process.env = { NODE_ENV: 'development', DEV_AUTH_PASSWORD: devPasswordStub };
        const guard = new DevGuard();

        expect(guard.canActivate(context)).toBeTruthy();
    });
});
