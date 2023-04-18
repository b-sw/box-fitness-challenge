import { HttpException } from '@nestjs/common';
import { AdminGuard } from '../../guards/roles/admin.guard';

describe('DevGuard', () => {
    const adminIdStub = 'adminId';
    const context = {
        switchToHttp: () => ({
            getRequest: () => ({
                user: {
                    id: adminIdStub,
                },
            }),
        }),
    } as any;

    it('should not activate for not admin', (done) => {
        const usersService = { getByRole: () => [] };
        const guard = new AdminGuard(usersService as any);

        guard
            .canActivate(context)
            .then(() => {
                done('fail');
            })
            .catch((err) => {
                expect(err).toBeInstanceOf(HttpException);
                done();
            });
    });

    it('should activate for admin', async () => {
        const usersService = { getByRole: () => [{ id: adminIdStub }] };
        const guard = new AdminGuard(usersService as any);

        const canActivate = await guard.canActivate(context);

        expect(canActivate).toBeTruthy();
    });
});
