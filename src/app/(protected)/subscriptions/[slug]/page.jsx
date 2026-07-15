'use client';

import { FormEvent, useState } from 'react';
import subscriptionData from '@/data/plan.json';
import { Icon } from '@iconify/react';

import BackButton from '@/components/ui/BackButton';
import SuccessModal from '@/components/shared/SuccessModal';
import NotFound from '@/components/ui/NotFound';
import { useNavigate, useParams } from 'react-router';

export default function EditSubscriptionPage() {
  const navigate = useNavigate();
  const params = useParams();
  const slug = params.slug;

  const currentSubscription = subscriptionData.subscriptions.find(
    (subscription) => subscription.href.split('/').pop() === slug
  );

  const [title, setTitle] = useState(currentSubscription?.title ?? '');
  const [duration, setDuration] = useState(
    currentSubscription?.billingPeriod ?? ''
  );
  const [price, setPrice] = useState(currentSubscription?.price ?? '');
  const [description, setDescription] = useState(
    currentSubscription?.description ?? ''
  );
  const [points, setPoints] = useState(
    currentSubscription?.features ?? []
  );

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePointChange = (index, value) => {
    setPoints((currentPoints) =>
      currentPoints.map((point, pointIndex) =>
        pointIndex === index ? value : point
      )
    );
  };

  const handleAddPoint = () => {
    setPoints((currentPoints) => [...currentPoints, '']);
  };

  const handleRemovePoint = (index) => {
    setPoints((currentPoints) =>
      currentPoints.filter((_, pointIndex) => pointIndex !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setIsSubmitting(true);

      const formData = {
        title,
        duration,
        price,
        description,
        points: points.filter((point) => point.trim()),
      };

      console.log('Updated subscription:', formData);

      // Add your API call here.
      // await updateSubscription(formData);

      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error('Failed to update subscription:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalDone = () => {
      setIsSuccessModalOpen(false);
      navigate('/subscriptions');
    };
    if (!currentSubscription) {
    return (
      <NotFound/>
    );
  }

  return (
    <>
      <div className="w-full max-w-[20em]">
        <BackButton href="/subscriptions">
          Edit Subscription
        </BackButton>

        <form
          onSubmit={handleSubmit}
          className="mt-3 flex w-full flex-col gap-6 edit-subscription-form"
        >
          <div className="relative w-full">
            <label
              htmlFor="subscription-title"
              className="absolute -top-[0.3em] left-5 z-10 bg-gradient-to-b from-transparent via-white  to-transparent px-1  font-normal leading-none text-black"
            >
              Title
            </label>

            <input
              id="subscription-title"
              type="text"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              placeholder="Pilot Car"
              required
              className="h-[4em] w-full rounded-sm border border-black/10 bg-white px-5  font-light text-black/70 shadow-[0_14px_30px_rgba(0,0,0,0.12)] outline-none placeholder:text-black/25 focus:border-brand"
            />
          </div>

          <div className="relative w-full">
            <label
              htmlFor="subscription-duration"
              className="absolute -top-[0.3em] left-5 z-10 bg-gradient-to-b from-transparent via-white  to-transparent px-1  font-normal leading-none text-black"
            >
              Duration
            </label>

            <input
              id="subscription-duration"
              type="text"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              placeholder="Monthly"
              required
              className="h-[4em] w-full rounded-sm border border-black/10 bg-white px-5 font-light text-black/70 shadow-[0_14px_30px_rgba(0,0,0,0.12)] outline-none placeholder:text-black/25 focus:border-brand"
            />
          </div>

          <div className="relative w-full">
            <label
              htmlFor="subscription-price"
              className="absolute -top-[0.3em] left-5 z-10 bg-gradient-to-b from-transparent via-white  to-transparent px-1 font-normal leading-none text-black"
            >
              Price
            </label>

            <input
              id="subscription-price"
              type="number"
              value={price}
              min="0"
              step="1"
              inputMode="numeric"
              onKeyDown={(event) => {
                if (['e', 'E', '+', '-', '.'].includes(event.key)) {
                  event.preventDefault();
                }
              }}
              onChange={(event) => {
                const value = event.target.value;

                if (value === '' || /^\d+$/.test(value)) {
                  setPrice(value);
                }
              }}
              onPaste={(event) => {
                const pastedValue = event.clipboardData.getData('text');

                if (!/^\d+$/.test(pastedValue)) {
                  event.preventDefault();
                }
              }}
              placeholder="05"
              required
              className="h-[4em] w-full rounded-sm border border-black/10 bg-white px-5  font-light text-black/70 shadow-[0_14px_30px_rgba(0,0,0,0.12)] outline-none placeholder:text-black/25 focus:border-brand"
            />
          </div>

          <div className="relative w-full">
            <label
              htmlFor="subscription-description"
              className="absolute -top-[0.3em] left-5 z-10 bg-gradient-to-b from-transparent via-white  to-transparent px-1  font-normal leading-none text-black"
            >
              Description
            </label>

            <textarea
              id="subscription-description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Enter subscription description"
              required
              rows={4}
              className="min-h-[5.5rem] w-full resize-none rounded-sm border border-black/10 bg-white px-5 py-4  font-light text-black/70 shadow-[0_14px_30px_rgba(0,0,0,0.12)] outline-none placeholder:text-black/25 focus:border-brand"
            />
          </div>

          <div className="w-full">
            <h3 className="mb-3 font-medium text-black">
              Point List
            </h3>

            <div className="flex flex-col gap-3">
              {points.map((point, index) => (
                <div
                  key={index}
                  className="flex w-full items-center gap-3"
                >
                  <div className="flex min-h-[4em] flex-1 items-center rounded-sm border border-black/10 bg-white px-5 shadow-[0_14px_30px_rgba(0,0,0,0.12)] focus-within:border-brand">
                    <span className="mr-3 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-500" />

                    <input
                      type="text"
                      value={point}
                      onChange={(event) =>
                        handlePointChange(index, event.target.value)
                      }
                      placeholder="Enter point"
                      className="w-full bg-transparent font-light text-black/70 outline-none placeholder:text-black/25"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemovePoint(index)}
                    disabled={points.length === 1}
                    className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label={`Remove point ${index + 1}`}
                  >
                    <Icon
                      icon="lucide:x"
                      className="h-4 w-4"
                    />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={handleAddPoint}
                className="flex items-center gap-3 font-medium text-black"
              >
                <span>Add More</span>

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-white transition hover:scale-105">
                  <Icon
                    icon="lucide:plus"
                    className="h-4 w-4"
                  />
                </span>
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex h-[3.25rem] w-full items-center justify-center rounded-lg bg-brand-gradient font-bold text-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50"
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </button>
        </form>
      </div>

      <SuccessModal
        open={isSuccessModalOpen}
        onDone={handleModalDone}
        title="Successfully!"
        description="Subscription has been updated successfully."
        buttonText="Done"
      />
    </>
  );
}