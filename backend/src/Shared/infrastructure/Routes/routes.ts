/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MeetupPutController } from './../../../Meetup/infrastructure/Controllers/MeetupPutController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MeetupPatchController } from './../../../Meetup/infrastructure/Controllers/MeetupPatchController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MeetupGetController } from './../../../Meetup/infrastructure/Controllers/MeetupGetController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MeetupDeleteController } from './../../../Meetup/infrastructure/Controllers/MeetupDeleteController';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';



// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "MeetupModel": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "title": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "date": {"dataType":"string","required":true},
            "location": {"dataType":"string","required":true},
            "imageUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsMeetupPutController_createMeetup: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string","required":true},"location":{"dataType":"string","required":true},"date":{"dataType":"datetime","required":true},"description":{"dataType":"string","required":true},"title":{"dataType":"string","required":true}}},
        };
        app.put('/meetups/:id',
            ...(fetchMiddlewares<RequestHandler>(MeetupPutController)),
            ...(fetchMiddlewares<RequestHandler>(MeetupPutController.prototype.createMeetup)),

            async function MeetupPutController_createMeetup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMeetupPutController_createMeetup, request, response });

                const controller = new MeetupPutController();

              await templateService.apiHandler({
                methodName: 'createMeetup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMeetupPatchController_updateMeetup: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
                data: {"in":"body","name":"data","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"imageUrl":{"dataType":"string"},"location":{"dataType":"string"},"date":{"dataType":"datetime"},"description":{"dataType":"string"},"title":{"dataType":"string"}}},
        };
        app.patch('/meetups/:id',
            ...(fetchMiddlewares<RequestHandler>(MeetupPatchController)),
            ...(fetchMiddlewares<RequestHandler>(MeetupPatchController.prototype.updateMeetup)),

            async function MeetupPatchController_updateMeetup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMeetupPatchController_updateMeetup, request, response });

                const controller = new MeetupPatchController();

              await templateService.apiHandler({
                methodName: 'updateMeetup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMeetupGetController_getAllMeetups: Record<string, TsoaRoute.ParameterSchema> = {
        };
        app.get('/meetups',
            ...(fetchMiddlewares<RequestHandler>(MeetupGetController)),
            ...(fetchMiddlewares<RequestHandler>(MeetupGetController.prototype.getAllMeetups)),

            async function MeetupGetController_getAllMeetups(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMeetupGetController_getAllMeetups, request, response });

                const controller = new MeetupGetController();

              await templateService.apiHandler({
                methodName: 'getAllMeetups',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMeetupGetController_getMeetupById: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.get('/meetups/:id',
            ...(fetchMiddlewares<RequestHandler>(MeetupGetController)),
            ...(fetchMiddlewares<RequestHandler>(MeetupGetController.prototype.getMeetupById)),

            async function MeetupGetController_getMeetupById(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMeetupGetController_getMeetupById, request, response });

                const controller = new MeetupGetController();

              await templateService.apiHandler({
                methodName: 'getMeetupById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsMeetupDeleteController_deleteMeetup: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"string"},
        };
        app.delete('/meetups/:id',
            ...(fetchMiddlewares<RequestHandler>(MeetupDeleteController)),
            ...(fetchMiddlewares<RequestHandler>(MeetupDeleteController.prototype.deleteMeetup)),

            async function MeetupDeleteController_deleteMeetup(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsMeetupDeleteController_deleteMeetup, request, response });

                const controller = new MeetupDeleteController();

              await templateService.apiHandler({
                methodName: 'deleteMeetup',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 204,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
