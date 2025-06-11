import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Button } from './ui/button';
import { Contact, Mail, Pen } from 'lucide-react';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import AppliedJobsTable from './AppliedJobsTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { useSelector } from 'react-redux';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs';

const Profile = () => {

    useGetAppliedJobs()

    const isResume = true;
    const [open, setOpen] = useState(false)

    const {user} = useSelector(store => store.auth)

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl p-8 mt-6 shadow-sm">

                {/* Profile Header */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-5">
                        <Avatar className="h-24 w-24 shadow-sm">
                            <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                            <AvatarFallback className='bg-amber-300 text-4xl'>{user?.fullName.split(" ")[0].slice(0,1)}{user?.fullName.split(" ")[1].slice(0,1)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-800 mb-1">{user?.fullName}</h1>
                            <p className="text-sm text-gray-500">
                                {user?.profile?.bio}
                            </p>
                        </div>
                    </div>
                    <Button onClick={() => {setOpen(true)}} className="h-10 w-10" variant="outline">
                        <Pen className="h-4 w-4" />
                    </Button>
                </div>

                {/* Contact Info */}
                <div className="my-6">
                    <div className="flex items-center gap-3 text-gray-600 text-sm">
                        <Mail className="h-4 w-4" />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-600 mt-3 text-sm">
                        <Contact className="h-4 w-4" />
                        <span>+91 {user?.phoneNumber}</span>
                    </div>
                </div>

                {/* Skills */}
                <div className="my-5">
                    <h2 className="text-lg font-semibold mb-2 text-gray-800">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {user?.profile?.skills.length > 0
                            ? user?.profile?.skills.map((skill, idx) => (
                                <Badge key={idx} className="bg-purple-100 text-purple-700">
                                    {skill.toUpperCase()}
                                </Badge>
                            ))
                            : <span className="text-gray-400 text-sm">Not added</span>
                        }
                    </div>
                </div>

                {/* Resume */}
                <div className="my-6">
                    <Label className="font-semibold text-gray-800 text-lg block mb-1">Resume</Label>
                    {isResume ? (
                        <a
                            className="text-blue-600 hover:underline text-sm"
                            href={user?.profile?.resume}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {user?.profile?.resumeOriginalName}
                        </a>
                    ) : (
                        <span className="text-gray-400 text-sm">Not uploaded</span>
                    )}
                </div>
            </div>

            {/* Applied Jobs Section */}
            <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 mt-6 shadow-sm">
                <h2 className="text-lg font-bold text-gray-800 mb-4">Applied Jobs</h2>
                <AppliedJobsTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
